"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const htmlbeautifier_1 = __importDefault(require("./htmlbeautifier"));
class HtmlBeautifierProvider {
    htmlbeautifier;
    constructor() {
        this.htmlbeautifier = new htmlbeautifier_1.default();
    }
    /**
     * Provides formatting edits for the entire document
     * @param {vscode.TextDocument} document - The document to be formatted
     * @param {vscode.FormattingOptions} options - The formatting options
     * @param {vscode.CancellationToken} token - The cancellation token
     * @returns {vscode.ProviderResult<vscode.TextEdit[]>} The formatting edits
     */
    provideDocumentFormattingEdits(document, options, token) {
        return this.htmlbeautifier.format(document.getText()).then((result) => {
            return [
                new vscode.TextEdit(document.validateRange(new vscode.Range(0, 0, Infinity, Infinity)), result),
            ];
        }, (err) => {
            // will be handled in format
            return [];
        });
    }
    /**
     * Provides formatting edits for a specific range within the document
     * @param {vscode.TextDocument} document - The document to be formatted
     * @param {vscode.Range} range - The range to be formatted
     * @param {vscode.FormattingOptions} options - The formatting options
     * @param {vscode.CancellationToken} token - The cancellation token
     * @returns {vscode.ProviderResult<vscode.TextEdit[]>} The formatting edits
     */
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        return this.htmlbeautifier.format(document.getText(range)).then((result) => {
            return [new vscode.TextEdit(range, result)];
        }, (err) => {
            // will be handled in format
            return [];
        });
    }
}
exports.default = HtmlBeautifierProvider;
//# sourceMappingURL=htmlbeautifierProvider.js.map