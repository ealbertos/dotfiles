Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), jsbeautify = require("js-beautify");

function format(document, range) {
    if (null === range) {
        const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    const result = [], content = document.getText(range), formatted = beatify(content, document.languageId);
    return !!formatted && formatted !== content && result.push(new vscode.TextEdit(range, formatted)), 
    result;
}

function beatify(documentContent, languageId) {
    let beatiFunc = null;
    switch (languageId) {
      case "scss.erb":
        languageId = "css", beatiFunc = jsbeautify.css;

      case "css.erb":
        beatiFunc = jsbeautify.css;
        break;

      case "js.erb":
        languageId = "javascript", beatiFunc = jsbeautify.js;
        break;

      case "html.erb":
        beatiFunc = jsbeautify.html;
        break;

      default:
        !function showMesage(msg) {
            vscode.window.showInformationMessage(msg);
        }("Sorry, this language is not supported. Only support Javascript, CSS and HTML.");
    }
    if (!beatiFunc) return;
    let tabSize = null;
    const beutifyOptions = {}, prefix = languageId.split(".")[0], config = vscode.workspace.getConfiguration("");
    try {
        tabSize = config["[" + prefix]["erb]"]["editor.tabSize"];
    } catch (e) {
        tabSize = vscode.workspace.getConfiguration("editor").get("tabSize");
    }
    return null != tabSize && (beutifyOptions.indent_size = tabSize), beatiFunc(documentContent, beutifyOptions);
}

exports.format = format;

exports.Formatter = class Formatter {
    beautify() {
        let range;
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) return;
        const document = activeEditor.document;
        if (null === range) {
            const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        const content = document.getText(range), formatted = beatify(content, document.languageId);
        return !!formatted && formatted !== content ? activeEditor.edit(editor => {
            const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            return range = new vscode.Range(start, end), editor.replace(range, formatted);
        }) : void 0;
    }
    registerBeautify(range) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        return format(editor.document, range);
    }
    onSave(e) {
        const {document} = e;
        if (-1 === [ "css.erb", "scss.erb", "html.erb" ].indexOf(document.languageId)) return;
        const prefix = document.languageId.split(".")[0];
        let onSave = !1;
        const config = vscode.workspace.getConfiguration("", e.document);
        try {
            onSave = config["[" + prefix]["erb]"]["editor.formatOnSave"];
        } catch (e) {
            onSave = vscode.workspace.getConfiguration("editor").get("formatOnSave");
        }
        if (!onSave) return;
        const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        let range = new vscode.Range(start, end);
        const content = document.getText(range), formatted = beatify(content, document.languageId);
        if (!!formatted && formatted !== content) {
            const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
            const edit = vscode.TextEdit.replace(range, formatted);
            e.waitUntil(Promise.resolve([ edit ]));
        }
    }
};