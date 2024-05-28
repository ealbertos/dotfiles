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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
suite("ERB Formatter/Beautify tests", () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    /**
     * Resolve the test file path located in the `fixtures` directory.
     * @param filename - The name of the file.
     * @returns The full path of the test file.
     */
    function resolveTestFilePath(filename) {
        return path.resolve(__dirname, "../../", "src/test/fixtures/", filename);
    }
    /**
     * Reads the content of a test file located in the `fixtures` directory.
     * @param filename - The name of the file to be read.
     * @returns The content of the file in UTF-8 encoding.
     */
    function readTestFile(filename) {
        return fs.readFileSync(resolveTestFilePath(filename), "utf-8");
    }
    /**
     * Changes a specific configuration value.
     * @param key - The configuration key.
     * @param value - The new value to set.
     */
    async function changeConfig(key, value) {
        await vscode.workspace
            .getConfiguration()
            .update(key, value, vscode.ConfigurationTarget.Global);
    }
    /**
     * Formats a document and asserts its content against an expected formatted version.
     * @param initialFile - The initial unformatted file name.
     * @param expectedFile - The expected formatted file name.
     * @param formatCommand - The vscode command to execute for formatting.
     */
    async function formatAndAssert(initialFile, expectedFile, formatCommand = "editor.action.formatDocument") {
        const document = await vscode.workspace.openTextDocument({
            language: "erb",
            content: readTestFile(initialFile),
        });
        await vscode.window.showTextDocument(document);
        await sleep(1500); // Allow time for the extension to load.
        if (formatCommand === "editor.action.formatSelection") {
            await vscode.commands.executeCommand("editor.action.selectAll");
        }
        await vscode.commands.executeCommand(formatCommand);
        await sleep(500); // Allow time for the formatting to occur.
        assert.strictEqual(document.getText(), readTestFile(expectedFile));
    }
    test("formats whole document without bundler", async () => {
        await changeConfig("vscode-erb-beautify.useBundler", false);
        await formatAndAssert("sample_unformatted.html.erb", "sample_formatted.html.erb");
    });
    test("formats whole document using bundler", async () => {
        await changeConfig("vscode-erb-beautify.useBundler", true);
        await formatAndAssert("sample_unformatted.html.erb", "sample_formatted.html.erb");
    });
    test("formats selection without bundler", async () => {
        await changeConfig("vscode-erb-beautify.useBundler", false);
        await formatAndAssert("sample_unformatted.html.erb", "sample_formatted.html.erb", "editor.action.formatSelection");
    });
    test("formats selection using bundler", async () => {
        await changeConfig("vscode-erb-beautify.useBundler", true);
        await formatAndAssert("sample_unformatted.html.erb", "sample_formatted.html.erb", "editor.action.formatSelection");
    });
    test("formats without encoding issue", async () => {
        await formatAndAssert("encoding_unformatted.html.erb", "encoding_formatted.html.erb");
    });
    test("Input ERB without final newline, insertFinalNewline=true", async () => {
        await changeConfig("files.insertFinalNewline", true);
        await formatAndAssert("without_final_newline.html.erb", "with_final_newline.html.erb");
    });
    test("Input ERB with final newline, insertFinalNewline=true", async () => {
        await changeConfig("files.insertFinalNewline", true);
        await formatAndAssert("with_final_newline.html.erb", "with_final_newline.html.erb");
    });
    test("Input ERB without final newline, insertFinalNewline=false", async () => {
        await changeConfig("files.insertFinalNewline", false);
        await formatAndAssert("without_final_newline.html.erb", "without_final_newline.html.erb");
    });
    test("Input ERB with final newline, insertFinalNewline=false", async () => {
        await changeConfig("files.insertFinalNewline", false);
        await formatAndAssert("with_final_newline.html.erb", "with_final_newline.html.erb");
    });
});
//# sourceMappingURL=extension.test.js.map