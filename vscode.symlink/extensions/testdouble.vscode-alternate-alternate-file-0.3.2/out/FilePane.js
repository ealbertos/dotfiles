"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const result_async_1 = require("result-async");
/**
 * Open a file in a VS Code pane
 * @param viewColumn - The column to open the file in.
 * @param filePath - The path to the file to open
 */
exports.open = (viewColumn, filePath) => __awaiter(this, void 0, void 0, function* () {
    if (!filePath)
        return result_async_1.error("You must pass filePath to open");
    const fileUri = vscode.Uri.file(filePath);
    try {
        yield vscode.window.showTextDocument(fileUri, { viewColumn });
        return result_async_1.ok(filePath);
    }
    catch (e) {
        return result_async_1.error(`Can't open ${filePath}`);
    }
});
/**
 * Get the VS Code editor object of the active editor, if any.
 * @returns a TextEditor if there's an active editor, or null if not
 */
exports.getActiveEditor = () => vscode.window.activeTextEditor || null;
/**
 * Get the absolute path to the active file.
 * @returns the path, or null if no active file
 */
exports.getCurrentPath = (activeEditor) => {
    const path = activeEditor.document.uri.fsPath;
    return path;
};
/**
 * For opening in a split pane.
 * @returns the number of the pane to the right of the active one.
 */
exports.nextViewColumn = (split, activeEditor) => {
    if (!activeEditor)
        return 0;
    if (!activeEditor.viewColumn)
        return 0;
    if (!split)
        return -1;
    return activeEditor.viewColumn + 1;
};
/**
 * Get the Workspace of the current editor.
 * @returns Ok(Workspace), or Error(null) if there's no workspace open.
 */
function getActiveWorkspace() {
    const editor = exports.getActiveEditor();
    const workspace = editor
        ? vscode.workspace.getWorkspaceFolder(editor.document.uri)
        : vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0]
            : undefined;
    if (!workspace)
        return result_async_1.error(null);
    return result_async_1.ok(workspace);
}
exports.getActiveWorkspace = getActiveWorkspace;
//# sourceMappingURL=FilePane.js.map