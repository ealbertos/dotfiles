Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), path = require("path"), fs = require("fs"), utils_1 = require("./utils"), rails_helper_1 = require("./rails_helper"), constants_1 = require("./constants"), rails_1 = require("./symbols/rails"), ruby_1 = require("./symbols/ruby"), inflection = require("inflection"), readline = require("readline");

function wordsToPath(s) {
    return inflection.underscore(s.replace(/[A-Z]{2,}(?![a-z])/, s => inflection.titleize(s)));
}

function getConcernsFilePath(lineStartToWord, fileT) {
    const seq = lineStartToWord.replace(constants_1.PATTERNS.INCLUDE_DECLARATION, "").split("::").map(wordsToPath);
    "concerns" === seq[0] && delete seq[0];
    const sub = seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1], fileType = constants_1.FileTypeRelPath.get(fileT);
    return path.join(fileType, sub, name + ".rb");
}

function findClassInDocumentCallback(name, document) {
    const line = document.getText().split("\n").findIndex(line => new RegExp("^class\\s+(((::)?[A-Za-z]+)*(::)?" + name + ")[^\\w]").test(line.trim())), definitionInformation = {
        file: document.uri.fsPath,
        line: Math.max(line, 0),
        column: 0
    };
    return Promise.resolve(definitionInformation);
}

async function getLibOrModelFilePath(lineStartToWord, word) {
    const symbol = new RegExp("(((::)?[A-Za-z]+)*(::)?" + word + ")").exec(lineStartToWord)[1], seq = symbol.split("::").map(wordsToPath).filter(v => "" !== v), sub = seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1], filePathInModels = path.join(constants_1.REL_MODELS, "**", sub, name + ".rb"), filePathInLib = name ? path.join("lib", sub, name + ".rb") : "", thePath = sub ? path.join(vscode.workspace.rootPath, "lib", sub + ".rb") : "", demodulized = inflection.demodulize(symbol), funcOrClass = -1 !== demodulized.indexOf(".") ? demodulized.split(".")[1] : demodulized, regPrefix = constants_1.PATTERNS.CAPITALIZED.test(funcOrClass) ? "class\\s+" : "def\\s+", reg = new RegExp(regPrefix + funcOrClass + "[^\\w]"), findInLib = vscode.workspace.findFiles(filePathInLib, null, 1).then(uris => uris.length ? vscode.workspace.openTextDocument(uris[0]).then(findClassInDocumentCallback.bind(null, name), () => Promise.reject("Could Not Open file: " + filePathInLib)) : thePath ? Promise.resolve(findFunctionOrClassByClassNameInFile(thePath, reg)) : Promise.resolve(null), () => thePath ? Promise.resolve(findFunctionOrClassByClassNameInFile(thePath, reg)) : Promise.resolve(null));
    try {
        const uris = await vscode.workspace.findFiles(filePathInModels, null, 1);
        return uris.length ? vscode.workspace.openTextDocument(uris[0]).then(findClassInDocumentCallback.bind(null, name), () => Promise.reject("Could Not Open file: " + filePathInModels)) : filePathInLib ? findInLib : Promise.resolve(null);
    } catch (e) {
        return filePathInLib ? findInLib : Promise.resolve(null);
    }
}

function findLocationByWord(document, position, word, lineStartToWord) {
    if (constants_1.PATTERNS.CAPITALIZED.test(word)) return getLibOrModelFilePath(lineStartToWord, word);
    {
        const fileNameWithoutSuffix = path.parse(document.fileName).name;
        return findFunctionOrClassByClassName(document, position, word, inflection.camelize(fileNameWithoutSuffix));
    }
}

function findViews(document, position, word, lineStartToWord) {
    let filePath;
    const lineText = document.lineAt(position.line).text.trim(), match1 = lineStartToWord.match(constants_1.PATTERNS.RENDER_MATCH), match1id = match1[match1.length - 1], match2 = lineText.match(constants_1.PATTERNS.RENDER_MATCH), idIndex = match2.findIndex(v => v.includes(match1id)), id = match2[idIndex], preWord = match2[idIndex - 1];
    if ("render" === preWord && -1 !== [ "template", "partial", "layout", "json", "html" ].indexOf(id)) return null;
    const viewPath = path.parse(id).dir + path.sep + "*" + path.parse(id).name + ".*", sub = -1 !== id.indexOf("/") ? "" : vscode.workspace.asRelativePath(document.fileName).substring(constants_1.REL_CONTROLLERS.length + 1).replace("_controller.rb", "");
    return filePath = "layout" === preWord ? path.join(constants_1.REL_LAYOUTS, viewPath) : path.join(constants_1.REL_VIEWS, sub, viewPath), 
    filePath;
}

function controllerDefinitionLocation(document, position, word, lineStartToWord) {
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0
    };
    if (constants_1.PATTERNS.FUNCTION_DECLARATON.test(lineStartToWord) && !constants_1.PATTERNS.PARAMS_DECLARATION.test(word)) {
        const sameModuleControllerSub = path.dirname(vscode.workspace.asRelativePath(document.fileName).substring(constants_1.REL_CONTROLLERS.length + 1)), filePath = path.join(constants_1.REL_VIEWS, sameModuleControllerSub, path.basename(document.fileName).replace(/_controller\.rb$/, ""), word + ".*"), upperText = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
        if (/\s*private/.test(upperText)) return Promise.resolve(null);
        definitionInformation.file = filePath;
    } else if (constants_1.PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord)) definitionInformation.file = getConcernsFilePath(lineStartToWord, constants_1.FileType.ControllerConcerns); else if (constants_1.PATTERNS.PARAMS_DECLARATION.test(word)) {
        const filePath = document.fileName, line = document.getText().split("\n").findIndex(line => new RegExp("^def\\s+" + word + "[^\\w]").test(line.trim()));
        definitionInformation.file = filePath, definitionInformation.line = line;
    } else if (constants_1.PATTERNS.LAYOUT_DECLARATION.test(lineStartToWord)) {
        const layoutPath = constants_1.PATTERNS.LAYOUT_MATCH.exec(lineStartToWord)[2];
        definitionInformation.file = path.join(constants_1.REL_LAYOUTS, layoutPath + ".*");
    } else {
        if (!constants_1.PATTERNS.RENDER_DECLARATION.test(lineStartToWord) && !constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) {
            if (constants_1.PATTERNS.CONTROLLER_FILTERS.test(lineStartToWord)) {
                const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = inflection.camelize(fileNameWithoutSuffix);
                return findFunctionOrClassByClassName(document, position, word, controllerName);
            }
            if (constants_1.PATTERNS.HELPER_METHODS.test(lineStartToWord)) {
                const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = inflection.camelize(fileNameWithoutSuffix);
                return findFunctionOrClassByClassName(document, position, word, controllerName);
            }
            return findLocationByWord(document, position, word, lineStartToWord);
        }
        definitionInformation.file = findViews(document, position, 0, lineStartToWord);
    }
    return new Promise(definitionResolver(document, definitionInformation));
}

function getSymbolPath(relpath, line, fileType) {
    const [currentClassRaw, parentClassRaw] = line.split("<"), currentClass = currentClassRaw.trim(), parentClass = parentClassRaw.trim(), relPath = constants_1.FileTypeRelPath.get(fileType);
    if (currentClass.includes("::") && !parentClass.includes("::")) return path.join(relPath, wordsToPath(parentClass) + ".rb");
    const parent = parentClass.trim(), sameModuleSub = path.dirname(relpath.substring(relPath.length + 1)), seq = parent.split("::").map(wordsToPath).filter(v => "" !== v), sub = parent.includes("::") ? seq.slice(0, -1).join(path.sep) : sameModuleSub, name = seq[seq.length - 1];
    return path.join(relPath, sub, name + ".rb");
}

function getParentControllerFilePathByDocument(entryDocument, line) {
    return getSymbolPath(vscode.workspace.asRelativePath(entryDocument.fileName), line, constants_1.FileType.Controller);
}

async function getFunctionOrClassInfoInFile(fileAbsPath, reg) {
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0
    };
    if (!fs.existsSync(fileAbsPath)) return [ definitionInformation, null ];
    const fileStream = fs.createReadStream(fileAbsPath), rl = readline.createInterface({
        input: fileStream,
        crlfDelay: 1 / 0
    });
    let classDeclaration, lineNumber = 0, lineIndex = -1;
    for await (const lineText of rl) {
        if (constants_1.PATTERNS.CLASS_INHERIT_DECLARATION.test(lineText) && (classDeclaration = lineText), 
        reg.test(lineText)) {
            lineIndex = lineNumber, definitionInformation.file = fileAbsPath, definitionInformation.line = lineIndex, 
            definitionInformation.column = lineText.length;
            break;
        }
        lineNumber++;
    }
    return [ definitionInformation, classDeclaration ];
}

async function findFunctionOrClassByClassNameInFile(fileAbsPath, reg) {
    let [definitionInformation, classDeclaration] = await getFunctionOrClassInfoInFile(fileAbsPath, reg), lineIndex = definitionInformation.line;
    for (;-1 === lineIndex; ) {
        const [, symbol] = classDeclaration.split("<"), parentController = symbol.trim(), filePath = getSymbolPath(vscode.workspace.asRelativePath(fileAbsPath), parentController, constants_1.FileType.Controller), fileAbsPath2 = path.join(vscode.workspace.rootPath, filePath);
        [definitionInformation, classDeclaration] = await getFunctionOrClassInfoInFile(fileAbsPath2, reg), 
        lineIndex = definitionInformation.line;
    }
    if (-1 !== lineIndex) return definitionInformation;
}

function findFunctionOrClassByClassName(entryDocument, position, funcOrClass, clasName) {
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0
    }, lines = entryDocument.getText().split("\n"), regPrefix = constants_1.PATTERNS.CAPITALIZED.test(funcOrClass) ? "class\\s+" : "def\\s+", reg = new RegExp(regPrefix + funcOrClass + "(?![A-Za-z0-9_])"), lineIndex = lines.findIndex(line => reg.test(line.trim()));
    if (-1 !== lineIndex) return definitionInformation.file = entryDocument.uri.fsPath, 
    definitionInformation.line = lineIndex, definitionInformation.column = lines[lineIndex].length, 
    Promise.resolve(definitionInformation);
    {
        const beforeRange = new vscode.Range(new vscode.Position(0, 0), position), line = entryDocument.getText(beforeRange).split("\n").find(line => new RegExp("^class\\s+.*" + clasName + "[^\\w]").test(line.trim()));
        if (!line) return Promise.reject("");
        const filePath = getParentControllerFilePathByDocument(entryDocument, line), fileAbsPath = path.join(vscode.workspace.rootPath, filePath);
        return new Promise((resolve, reject) => {
            resolve(findFunctionOrClassByClassNameInFile(fileAbsPath, reg));
        });
    }
}

function modelDefinitionLocation(document, position, word, lineStartToWord) {
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0
    };
    if (new RegExp("(^has_one|^has_many|^has_and_belongs_to_many|^belongs_to)\\s+:" + word).test(lineStartToWord)) {
        const name = inflection.singularize(word);
        definitionInformation.file = path.join(constants_1.REL_MODELS, "**", name + ".rb");
    } else constants_1.PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord) ? definitionInformation.file = getConcernsFilePath(lineStartToWord, constants_1.FileType.ModelConcerns) : (constants_1.PATTERNS.RENDER_DECLARATION.test(lineStartToWord) || constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) && (definitionInformation.file = findViews(document, position, 0, lineStartToWord));
    return new Promise(definitionResolver(document, definitionInformation));
}

exports.getConcernsFilePath = getConcernsFilePath, exports.findClassInDocumentCallback = findClassInDocumentCallback, 
exports.getLibOrModelFilePath = getLibOrModelFilePath, exports.findLocationByWord = findLocationByWord, 
exports.findViews = findViews, exports.controllerDefinitionLocation = controllerDefinitionLocation, 
exports.getSymbolPath = getSymbolPath, exports.getParentControllerFilePathByDocument = getParentControllerFilePathByDocument, 
exports.getFunctionOrClassInfoInFile = getFunctionOrClassInfoInFile, exports.findFunctionOrClassByClassNameInFile = findFunctionOrClassByClassNameInFile, 
exports.findFunctionOrClassByClassName = findFunctionOrClassByClassName, exports.modelDefinitionLocation = modelDefinitionLocation;

const FileTypeHandlers = new Map([ [ constants_1.FileType.Controller, controllerDefinitionLocation ], [ constants_1.FileType.Helper, controllerDefinitionLocation ], [ constants_1.FileType.Model, modelDefinitionLocation ] ]);

function definitionResolver(document, definitionInformation, exclude = null, maxNum = null) {
    return (resolve, reject) => {
        const findPath = path.isAbsolute(definitionInformation.file) ? vscode.workspace.asRelativePath(definitionInformation.file) : definitionInformation.file;
        vscode.workspace.findFiles(findPath).then(uris => {
            if (uris.length) if (1 === uris.length) definitionInformation.file = uris[0].fsPath, 
            resolve(definitionInformation); else {
                const relativeFileName = vscode.workspace.asRelativePath(document.fileName);
                new rails_helper_1.RailsHelper(relativeFileName, null).showQuickPick(uris.map(uri => vscode.workspace.asRelativePath(uri.path))), 
                resolve(null);
            } else reject("Missing file: " + definitionInformation.file);
        }, () => {
            reject("Missing file: " + definitionInformation.file);
        });
    };
}

function definitionLocation(document, position, goConfig, token) {
    const wordRange = document.getWordRangeAtPosition(position), lineText = document.lineAt(position.line).text.trim(), lineStartToWord = document.getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end)).trim(), word = document.getText(wordRange);
    if (lineText.startsWith("//") || word.match(/^\d+.?\d+$/)) return Promise.resolve(null);
    goConfig || (goConfig = vscode.workspace.getConfiguration("rails"));
    const symbol = new RegExp("(((::)?[A-Za-z]+)*(::)?" + word + ")").exec(lineStartToWord)[1];
    if (rails_1.RAILS.has(symbol) || ruby_1.RUBY.has(symbol)) return Promise.resolve(null);
    const fileType = utils_1.dectFileType(document.fileName);
    if (constants_1.FileType.Unkown === fileType) return Promise.resolve(null);
    const handle = FileTypeHandlers.get(fileType);
    return handle ? handle(document, position, word, lineStartToWord) : Promise.resolve(null);
}

exports.definitionResolver = definitionResolver, exports.definitionLocation = definitionLocation;

exports.RailsDefinitionProvider = class RailsDefinitionProvider {
    constructor(goConfig) {
        this.goConfig = null, this.goConfig = goConfig;
    }
    provideDefinition(document, position, token) {
        return definitionLocation(document, position, this.goConfig).then(definitionInfo => {
            if (null === definitionInfo || null === definitionInfo.file) return null;
            const definitionResource = vscode.Uri.file(definitionInfo.file), pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0);
            return new vscode.Location(definitionResource, pos);
        }, err => !err || "string" == typeof err && err.startsWith("Missing file: ") ? Promise.resolve(null) : Promise.reject(err));
    }
};