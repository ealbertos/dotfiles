'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const PATTERN = 'db/migrate/*.rb';
function onError(err) {
    vscode_1.window.showErrorMessage(err.toString());
}
function onFilesFound(files) {
    const paths = files.map(file => file.fsPath).sort();
    if (paths.length > 0) {
        const latest = paths[paths.length - 1];
        vscode_1.workspace.openTextDocument(latest).then(vscode_1.window.showTextDocument, onError);
    }
    else {
        vscode_1.window.showInformationMessage('No migrations found!');
    }
}
function activate(context) {
    const latestMigration = vscode_1.commands.registerCommand('extension.railsLatestMigration', () => {
        vscode_1.workspace.findFiles(PATTERN, null).then(onFilesFound, onError);
    });
    context.subscriptions.push(latestMigration);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map