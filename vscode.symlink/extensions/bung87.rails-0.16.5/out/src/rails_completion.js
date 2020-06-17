Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), path = require("path"), utils_1 = require("./utils"), rails_definition_1 = require("./rails_definition"), minimatch = require("minimatch"), fs = require("fs"), readline = require("readline"), constants_1 = require("./constants"), rails_helper_1 = require("./rails_helper"), QUERY_METHODS = [ "find_by", "first", "last", "take", "find", "find_each", "find_in_batches", "create_with", "distinct", "eager_load", "extending", "from", "group", "having", "includes", "joins", "left_outer_joins", "limit", "lock", "none", "offset", "order", "preload", "readonly", "references", "reorder", "reverse_order", "select", "where", "all" ];

var TriggerCharacter;

function modelQueryInterface() {
    const suggestions = [];
    return QUERY_METHODS.forEach(value => {
        const item = new vscode.CompletionItem(value);
        item.insertText = value, item.kind = vscode.CompletionItemKind.Method, suggestions.push(item);
    }), suggestions;
}

async function getCols(fileAbsPath, position, triggerCharacter, prefix) {
    const fileStream = fs.createReadStream(fileAbsPath), rl = readline.createInterface({
        input: fileStream,
        crlfDelay: 1 / 0
    }), cols = [];
    for await (const lineText of rl) if (/^#\s+([a-z0-9_]+)/.test(lineText)) {
        const col = /^#\s+([a-z0-9_]+)/.exec(lineText)[1], name = prefix ? prefix + col : col, item = new vscode.CompletionItem(name);
        item.insertText = name, item.kind = vscode.CompletionItemKind.Field, cols.push(item);
    }
    return cols;
}

!function(TriggerCharacter) {
    TriggerCharacter[TriggerCharacter.dot = 0] = "dot", TriggerCharacter[TriggerCharacter.quote = 1] = "quote", 
    TriggerCharacter[TriggerCharacter.colon = 2] = "colon";
}(TriggerCharacter = exports.TriggerCharacter || (exports.TriggerCharacter = {})), 
exports.modelQueryInterface = modelQueryInterface;

exports.RailsCompletionItemProvider = class RailsCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        return this.provideCompletionItemsInternal(document, position, token, vscode.workspace.getConfiguration("rails", document.uri));
    }
    provideCompletionItemsInternal(document, position, token, config) {
        return new Promise(async (resolve, reject) => {
            const suggestions = [], lineText = (document.fileName, document.lineAt(position.line).text), lineTillCurrentPosition = lineText.substr(0, position.character), character = lineTillCurrentPosition[lineTillCurrentPosition.length - 1];
            if (lineText.match(/^\s*\/\//)) return resolve([]);
            let triggerCharacter;
            switch (character) {
              case ".":
                triggerCharacter = TriggerCharacter.dot;
                break;

              case '"':
              case "'":
                triggerCharacter = TriggerCharacter.quote;
                break;

              case ":":
                triggerCharacter = TriggerCharacter.colon;
            }
            let position2 = new vscode.Position(position.line, position.character - 1);
            if (triggerCharacter === TriggerCharacter.dot && constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                const [, id, model] = constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition);
                position2 = new vscode.Position(position.line, lineText.indexOf(id));
            }
            const wordAtPosition = document.getWordRangeAtPosition(position2);
            if (!wordAtPosition) return resolve(null);
            const word = document.getText(wordAtPosition);
            let currentWord = "";
            if (wordAtPosition && wordAtPosition.start.character < position.character && (currentWord = word.substr(0, position.character - wordAtPosition.start.character)), 
            currentWord.match(/^\d+$/)) return resolve([]);
            if (triggerCharacter === TriggerCharacter.dot) {
                let info, fileType;
                try {
                    info = await rails_definition_1.definitionLocation(document, position2), fileType = utils_1.dectFileType(info.file);
                } catch (e) {
                    reject(e);
                }
                switch (fileType) {
                  case constants_1.FileType.Model:
                    suggestions.push(...modelQueryInterface());
                    const methods = await async function getMethods(fileAbsPath) {
                        const methods = [];
                        let markAsStart = !1, markAsEnd = !1;
                        const fileStream = fs.createReadStream(fileAbsPath), rl = readline.createInterface({
                            input: fileStream,
                            crlfDelay: 1 / 0
                        });
                        for await (const lineText of rl) if (/^class\s+<<\s+self/.test(lineText) && (markAsStart = !0, 
                        markAsEnd = !1), /^private$/.test(lineText) && (markAsEnd = !0), !markAsEnd && markAsStart && constants_1.PATTERNS.FUNCTION_DECLARATON.test(lineText)) {
                            const func = lineText.replace(constants_1.PATTERNS.FUNCTION_DECLARATON, ""), item = new vscode.CompletionItem(func);
                            item.insertText = func, item.kind = vscode.CompletionItemKind.Method, methods.push(item);
                        }
                        return methods;
                    }(info.file);
                    suggestions.push(...methods);
                    const cols = await getCols(info.file, 0, 0, "find_by_");
                    suggestions.push(...cols);
                }
            } else if (triggerCharacter === TriggerCharacter.colon || triggerCharacter === TriggerCharacter.quote) if (constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                const [, id, model] = constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition), position2 = new vscode.Position(position.line, lineText.indexOf(id));
                let info, fileType;
                try {
                    info = await rails_definition_1.definitionLocation(document, position2), fileType = utils_1.dectFileType(info.file);
                } catch (e) {
                    reject(e);
                }
                switch (fileType) {
                  case constants_1.FileType.Model:
                    const cols = await getCols(info.file);
                    suggestions.push(...cols);
                }
            } else if (constants_1.PATTERNS.RENDER_DECLARATION.test(lineTillCurrentPosition.trim()) || constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineTillCurrentPosition.trim()) || constants_1.PATTERNS.LAYOUT_DECLARATION.test(lineTillCurrentPosition.trim())) {
                switch (lineTillCurrentPosition.match(/([a-z]+)/g).pop()) {
                  case "partial":
                    {
                        const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new rails_helper_1.RailsHelper(relativeFileName, null), paths = rh.searchPaths().filter(v => !1 === v.startsWith(constants_1.REL_LAYOUTS) && !0 === v.startsWith(constants_1.REL_VIEWS)), items = await rh.generateList(paths).then(list => list.map(v => path.parse(v).name.split(".")[0]).filter(v => v.startsWith("_")).map(v => {
                            const name = v.substring(1), item = new vscode.CompletionItem(name);
                            return item.insertText = triggerCharacter === TriggerCharacter.colon ? " '" + name + "'" : name, 
                            item.kind = vscode.CompletionItemKind.File, item;
                        }));
                        suggestions.push(...items);
                    }
                    break;

                  case "template":
                    {
                        const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new rails_helper_1.RailsHelper(relativeFileName, null), paths = rh.searchPaths().filter(v => !1 === v.startsWith(constants_1.REL_LAYOUTS) && !0 === v.startsWith(constants_1.REL_VIEWS)), items = await rh.generateList(paths).then(list => list.map(v => path.basename(v.substring(constants_1.REL_VIEWS.length + 1).split(".")[0])).filter(v => !1 === path.basename(v).startsWith("_")).map(v => {
                            const name = v, item = new vscode.CompletionItem(name);
                            return item.insertText = triggerCharacter === TriggerCharacter.colon ? " '" + name + "'" : name, 
                            item.kind = vscode.CompletionItemKind.File, item;
                        }));
                        if (suggestions.push(...items), TriggerCharacter.quote === triggerCharacter) {
                            const views = await vscode.workspace.findFiles(path.join(constants_1.REL_VIEWS, "**"), constants_1.REL_LAYOUTS).then(res => res.filter(v => {
                                const p = vscode.workspace.asRelativePath(v);
                                return paths.some(v2 => !minimatch(p, v2)) || path.basename(p).startsWith("_");
                            }).map(i => {
                                const name = vscode.workspace.asRelativePath(i).substring(constants_1.REL_VIEWS.length + 1).split(".")[0], item = new vscode.CompletionItem(name);
                                return item.insertText = triggerCharacter === TriggerCharacter.colon ? " '" + name + "'" : name, 
                                item.kind = vscode.CompletionItemKind.File, item;
                            }));
                            suggestions.push(...views);
                        }
                    }
                    break;

                  case "layout":
                    {
                        const views = await vscode.workspace.findFiles(path.join(constants_1.REL_LAYOUTS, "**"), null).then(res => res.map(i => {
                            const name = vscode.workspace.asRelativePath(i).substring(constants_1.REL_LAYOUTS.length + 1).split(".")[0], item = new vscode.CompletionItem(name);
                            return item.insertText = triggerCharacter === TriggerCharacter.colon ? " '" + name + "'" : name, 
                            item.kind = vscode.CompletionItemKind.File, item;
                        }));
                        suggestions.push(...views);
                    }
                }
            }
            resolve(suggestions);
        });
    }
};