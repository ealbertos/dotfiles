"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const completion_provider_1 = require("./font-awesome/completion-provider");
const documentation_1 = require("./font-awesome/documentation");
const hover_provider_1 = require("./font-awesome/hover-provider");
const version_migrations_1 = require("./version-migrations");
const configuration_1 = require("./font-awesome/configuration");
const disposables = [];
function registerProviders(context) {
    // Load config
    const { version, triggerWord, triggerCharacter, disableTriggerWordAutoClearPatterns, previewStyle, patterns, insertionTemplates, } = configuration_1.loadConfiguration();
    // Load icon documentation
    const documentation = new documentation_1.default(path.join(path.dirname(__dirname), `data/fontawesome-${version}`), previewStyle, version);
    const providers = {
        completion: new completion_provider_1.default(documentation, triggerWord, disableTriggerWordAutoClearPatterns, insertionTemplates),
        hover: new hover_provider_1.default(documentation, insertionTemplates),
    };
    disposables.push(vscode.languages.registerCompletionItemProvider(patterns, providers.completion, ...[triggerCharacter]), vscode.languages.registerHoverProvider(patterns, providers.hover));
    context.subscriptions.push(...disposables);
}
;
function unregisterProviders(context) {
    // If the providers are about to be registered again, remove previous instances first
    for (const disposable of disposables) {
        const existingIndex = context.subscriptions.indexOf(disposable);
        if (existingIndex !== -1) {
            context.subscriptions.splice(existingIndex, 1);
        }
        disposable.dispose();
    }
}
function clearAndLoadExtension(context) {
    unregisterProviders(context);
    registerProviders(context);
}
function activate(context) {
    // Whenever the configuration changes and affects the extension, reload everything
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(configuration_1.configurationSection)) {
            clearAndLoadExtension(context);
        }
    });
    clearAndLoadExtension(context);
    version_migrations_1.default.RunAll();
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map