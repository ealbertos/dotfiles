Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), path = require("path"), constants_1 = require("./constants"), rails_1 = require("./symbols/rails");

function findViews(document, position, _path, fileType = "", viewType = "partial") {
    let filePath;
    const isSameDirPartial = /^[a-zA-Z0-9_-]+$/.test(_path), isViewsRelativePath = -1 !== _path.indexOf("/"), ext = path.parse(_path).ext, _underscore = viewType.endsWith("partial") ? "_" : "", definitionInformation = {
        file: null,
        line: 0,
        column: 0
    };
    if (isSameDirPartial) {
        const fileName = vscode.workspace.asRelativePath(document.fileName), dir = path.dirname(fileName);
        filePath = path.join(dir, `${_underscore}${_path}${fileType}.*`), definitionInformation.file = filePath;
    } else if (ext) filePath = path.join(constants_1.REL_VIEWS, _path), definitionInformation.file = filePath; else {
        if (!isViewsRelativePath) return Promise.reject("not a view");
        filePath = path.join(constants_1.REL_VIEWS, path.dirname(_path), `${_underscore}${path.basename(_path)}${fileType}.*`), 
        definitionInformation.file = filePath;
    }
    return new Promise(definitionResolver(document, definitionInformation));
}

exports.findViews = findViews;

new Map([ [ constants_1.FileType.View, findViews ] ]);

function definitionResolver(document, definitionInformation, exclude = null, maxNum = null) {
    return (resolve, reject) => {
        vscode.workspace.findFiles(vscode.workspace.asRelativePath(definitionInformation.file)).then(uris => {
            uris.length ? 1 === uris.length ? (definitionInformation.file = uris[0].fsPath, 
            resolve(definitionInformation)) : reject("No definition found!") : reject("Missing file: " + definitionInformation.file);
        }, () => {
            reject("Missing file: " + definitionInformation.file);
        });
    };
}

function definitionLocation(document, position, goConfig, token) {
    const wordRange = document.getWordRangeAtPosition(position, /([A-Za-z\/0-9_-]+)(\.[A-Za-z0-9]+)*/), lineText = document.lineAt(position.line).text.trim(), lineStartToWord = document.getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end)).trim(), matched = document.getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.start)).trim().match(constants_1.PATTERNS.RENDER_MATCH), preWord = matched && matched[matched.length - 1], viewType = preWord && !preWord.includes("render") ? preWord : "partial", word = document.getText(wordRange);
    goConfig || (goConfig = vscode.workspace.getConfiguration("rails"));
    const symbol = new RegExp("(((::)?[A-Za-z]+)*(::)?" + word + ")").exec(lineStartToWord)[1];
    if (rails_1.RAILS.has(symbol)) return Promise.reject("Rails symbols");
    lineText.match(constants_1.VIEWS_PATTERNS.RENDER_PATTERN);
    return findViews(document, 0, word, "", viewType);
}

exports.definitionResolver = definitionResolver, exports.definitionLocation = definitionLocation;

exports.ViewDefinitionProvider = class ViewDefinitionProvider {
    constructor(goConfig) {
        this.goConfig = null, this.goConfig = goConfig;
    }
    provideDefinition(document, position, token) {
        return definitionLocation(document, position, this.goConfig).then(definitionInfo => {
            if (null === definitionInfo || null === definitionInfo.file) return null;
            const definitionResource = vscode.Uri.file(definitionInfo.file), pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0);
            return new vscode.Location(definitionResource, pos);
        }, err => (!err || "string" == typeof err && err.startsWith("Missing file: "), Promise.reject("No definition found!")));
    }
};