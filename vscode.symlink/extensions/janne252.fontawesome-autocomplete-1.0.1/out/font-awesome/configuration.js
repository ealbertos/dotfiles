"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const transformation_1 = require("./transformation");
exports.configurationSection = 'fontAwesomeAutocomplete';
var ConfigKey;
(function (ConfigKey) {
    ConfigKey["Version"] = "version";
    ConfigKey["TriggerWord"] = "triggerWord";
    ConfigKey["PreviewBackgroundColor"] = "preview.backgroundColor";
    ConfigKey["PreviewForegroundColor"] = "preview.foregroundColor";
    ConfigKey["DisableTriggerWordAutoClearPatterns"] = "disableTriggerWordAutoClearPatterns";
    ConfigKey["InsertionTemplate"] = "insertionTemplate";
})(ConfigKey = exports.ConfigKey || (exports.ConfigKey = {}));
/** Loads and validates the extension configuration. */
function loadConfiguration() {
    const config = vscode.workspace.getConfiguration(exports.configurationSection);
    const version = config.get(ConfigKey.Version);
    let triggerWord = config.get(ConfigKey.TriggerWord);
    const triggerWordSetting = config.inspect(ConfigKey.TriggerWord);
    const disableTriggerWordAutoClearPatterns = config.get(ConfigKey.DisableTriggerWordAutoClearPatterns);
    const insertionTemplatesConfig = config.get(ConfigKey.InsertionTemplate);
    const insertionTemplates = [];
    for (const pattern in insertionTemplatesConfig) {
        insertionTemplates.push(new transformation_1.InsertionTemplate(pattern, insertionTemplatesConfig[pattern]));
    }
    let defaultTriggerWord = 'fa-';
    if (triggerWordSetting != null && triggerWordSetting.defaultValue != null) {
        defaultTriggerWord = triggerWordSetting.defaultValue;
    }
    else {
        defaultTriggerWord = 'fa-';
    }
    // Turn loaded glob patterns into DocumentFilters
    const patterns = config.get('patterns')
        .map(pattern => ({
        pattern,
        scheme: 'file',
    }));
    const previewStyle = {
        backgroundColor: config.get(ConfigKey.PreviewBackgroundColor),
        foregroundColor: config.get(ConfigKey.PreviewForegroundColor),
    };
    if (config.triggerWord.length == 0) {
        vscode.window.showErrorMessage(`Setting ${exports.configurationSection}.${ConfigKey.TriggerWord} cannot be empty - falling back to "${defaultTriggerWord}"!`, 'Restore').then(value => {
            if (value == 'Restore') {
                config.update(ConfigKey.TriggerWord, defaultTriggerWord);
            }
        });
        triggerWord = defaultTriggerWord;
    }
    const triggerCharacter = triggerWord[triggerWord.length - 1];
    return {
        version, triggerWord, disableTriggerWordAutoClearPatterns, patterns, previewStyle, insertionTemplates, triggerCharacter
    };
}
exports.loadConfiguration = loadConfiguration;
//# sourceMappingURL=configuration.js.map