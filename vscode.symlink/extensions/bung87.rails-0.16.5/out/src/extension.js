Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), rails_helper_1 = require("./rails_helper"), rails_definition_1 = require("./rails_definition"), rails_completion_1 = require("./rails_completion"), viewRef_1 = require("./viewRef"), view_doc_1 = require("./view_doc"), formatter_1 = require("./formatter"), fs = require("fs"), readline = require("readline"), RAILS_MODE = {
    language: "ruby",
    scheme: "file"
}, VIEW_MODE = {
    pattern: "**/views/**",
    scheme: "file"
};

function railsNavigation() {
    if (!vscode.window.activeTextEditor) return;
    const relativeFileName = vscode.workspace.asRelativePath(vscode.window.activeTextEditor.document.fileName), line = vscode.window.activeTextEditor.document.lineAt(vscode.window.activeTextEditor.selection.active.line).text.trim();
    new rails_helper_1.RailsHelper(relativeFileName, line).showFileList();
}

function registerFormatter(context) {
    const docType = [ "css.erb", "scss.erb", "html.erb" ];
    for (let i = 0, l = docType.length; i < l; i++) type = docType[i], context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
        provideDocumentRangeFormattingEdits: (document, range, options, token) => {
            const start = new vscode.Position(0, 0), end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            return formatter.registerBeautify(new vscode.Range(start, end));
        }
    }));
    var type;
    const formatter = new formatter_1.Formatter;
    context.subscriptions.push(vscode.commands.registerCommand("erb.formatting", () => {
        formatter.beautify();
    })), context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(e => {
        formatter.onSave(e);
    }));
}

exports.activate = function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("Rails:Navigation", railsNavigation)), 
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(RAILS_MODE, new rails_definition_1.RailsDefinitionProvider)), 
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({
        scheme: "file"
    }, new rails_completion_1.RailsCompletionItemProvider, ".", '"', ":", "'")), vscode.workspace.findFiles("Gemfile").then(async uris => {
        if (1 === uris.length) {
            const fileAbsPath = uris[0].fsPath, fileStream = fs.createReadStream(fileAbsPath), rl = readline.createInterface({
                input: fileStream,
                crlfDelay: 1 / 0
            });
            for await (const lineText of rl) if (/gem\s+['"]rails['"]/.test(lineText)) {
                context.subscriptions.push(vscode.languages.registerDefinitionProvider(VIEW_MODE, new viewRef_1.ViewDefinitionProvider)), 
                context.subscriptions.push(vscode.commands.registerCommand("Rails:Document", view_doc_1.viewDoc, context)), 
                registerFormatter(context);
                break;
            }
        }
    });
};