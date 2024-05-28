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
const alternate_file_1 = require("alternate-file");
const result_async_1 = require("result-async");
const pipeout_1 = require("pipeout");
const FilePane = require("./FilePane");
function initializeProjectionsHere() {
    return __awaiter(this, void 0, void 0, function* () {
        const workspace = FilePane.getActiveWorkspace();
        if (result_async_1.isError(workspace)) {
            vscode.window.showErrorMessage("You must open a file to initialize a .projections.json file");
            return;
        }
        const frameworks = yield alternate_file_1.possibleFrameworks();
        const names = result_async_1.okOrThrow(frameworks).map(([name, value]) => ({
            value,
            label: name
        }));
        const framework = yield vscode.window.showQuickPick(names, {
            placeHolder: "Pick a framework"
        });
        if (!framework)
            return;
        const workspaceRootPath = workspace.ok.uri.fsPath;
        const editor = FilePane.getActiveEditor();
        const nextColumn = FilePane.nextViewColumn(true, editor);
        // prettier-ignore
        return pipeout_1.pipeA(alternate_file_1.initializeProjections(workspaceRootPath, framework.value))(result_async_1.okChainAsync(projectionsPath => {
            vscode.window.showInformationMessage(`Created ${projectionsPath}`);
            return FilePane.open(nextColumn, projectionsPath);
        }))(result_async_1.errorDo(vscode.window.showErrorMessage))
            .value;
    });
}
exports.initializeProjectionsHere = initializeProjectionsHere;
//# sourceMappingURL=InitializeProjections.js.map