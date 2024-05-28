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
const FindAlternate = require("./FindAlternate");
const InitializeProjections_1 = require("./InitializeProjections");
let commands = [];
exports.activate = (context) => __awaiter(this, void 0, void 0, function* () {
    commands = [
        vscode.commands.registerCommand("alternateFile.initProjections", InitializeProjections_1.initializeProjectionsHere),
        vscode.commands.registerCommand("alternateFile.alternateFile", FindAlternate.openFile({ split: false })),
        vscode.commands.registerCommand("alternateFile.alternateFileInSplit", FindAlternate.openFile({ split: true })),
        vscode.commands.registerCommand("alternateFile.createAlternateFile", FindAlternate.createFile({ split: false })),
        vscode.commands.registerCommand("alternateFile.createAlternateFileInSplit", FindAlternate.createFile({ split: true }))
    ];
    commands.forEach(command => context.subscriptions.push(command));
});
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map