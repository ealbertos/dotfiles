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
const pipeout_1 = require("pipeout");
const FilePane = require("./FilePane");
const alternate_file_1 = require("alternate-file");
exports.openFile = ({ split }) => () => __awaiter(this, void 0, void 0, function* () {
    const activeEditor = FilePane.getActiveEditor();
    if (!activeEditor)
        return result_async_1.error("no active editor");
    const currentPath = FilePane.getCurrentPath(activeEditor);
    if (!currentPath)
        return result_async_1.error("no current path");
    const viewColumn = FilePane.nextViewColumn(split, activeEditor);
    // prettier-ignore
    return pipeout_1.pipeA(currentPath)(alternate_file_1.findAlternateFile)(result_async_1.okChainAsync((newPath) => FilePane.open(viewColumn, newPath)))(result_async_1.errorThen(logError))
        .value;
});
exports.createFile = ({ split }) => () => __awaiter(this, void 0, void 0, function* () {
    const activeEditor = FilePane.getActiveEditor();
    if (!activeEditor)
        return result_async_1.error("no active editor");
    const currentPath = FilePane.getCurrentPath(activeEditor);
    if (!currentPath)
        return result_async_1.error("no current path");
    const viewColumn = FilePane.nextViewColumn(split, activeEditor);
    // prettier-ignore
    return pipeout_1.pipeA(currentPath)(alternate_file_1.findOrCreateAlternateFile)(result_async_1.okChainAsync((newPath) => FilePane.open(viewColumn, newPath)))(result_async_1.errorThen(logError))
        .value;
});
const logError = (error) => {
    const message = alternate_file_1.isAlternateFileNotFoundError(error)
        ? error.message
        : error;
    vscode.window.showErrorMessage(message);
    return message;
};
//# sourceMappingURL=FindAlternate.js.map