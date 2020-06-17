"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const YAML = require("yaml");
const fs = require("fs");
const _1 = require("./");
const icon_1 = require("./icon");
/** Represents Font Awesome icon documentation (collection of icon entries) */
class Documentation {
    constructor(rootPath, previewStyle, version) {
        this.rootPath = rootPath;
        this.iconEntries = require(`${rootPath}/metadata/icons`);
        this.previewStyle = previewStyle;
        this.version = version;
        this.config = require(`${rootPath}/metadata/config`);
        this.title = `Font Awesome ${this.config.version}`;
        // Version support
        switch (version) {
            case _1.FontAwesomeVersion.v4:
                this.categories = {};
                this.shims = [];
                break;
            case _1.FontAwesomeVersion.V5:
                this.categories = YAML.parse(fs.readFileSync(`${rootPath}/metadata/categories.yml`, { encoding: 'utf8' }));
                this.shims = require(`${rootPath}/metadata/shims`);
                break;
        }
        this.icons = [];
        this.generateIcons();
    }
    getIconCategories(name) {
        const result = [];
        for (const categoryId in this.categories) {
            const category = this.categories[categoryId];
            if (category.icons.indexOf(name) != -1) {
                result.push(category);
            }
        }
        return result;
    }
    generateIcons() {
        for (const name in this.iconEntries) {
            const entry = this.iconEntries[name];
            const categories = this.getIconCategories(name);
            for (const style of entry.styles) {
                const icon = new icon_1.default(this, name, style, entry, categories);
                this.icons.push(icon);
            }
        }
    }
    asCompletionItem(icon) {
        return new FontAwesomeCompletionItem(icon);
    }
    asHoverItem(icon) {
        return new FontAwesomeHoverItem(icon);
    }
}
exports.default = Documentation;
class FontAwesomeCompletionItem extends vscode_1.CompletionItem {
    constructor(icon) {
        super(icon.fullCssName, // label
        vscode_1.CompletionItemKind.Reference // kind
        );
        this.icon = icon;
        this.documentation = icon.documentation;
    }
    get fullCssName() {
        return this.icon.fullCssName;
    }
}
exports.FontAwesomeCompletionItem = FontAwesomeCompletionItem;
class FontAwesomeHoverItem extends vscode_1.Hover {
    constructor(icon) {
        super([icon.documentation]);
    }
}
exports.FontAwesomeHoverItem = FontAwesomeHoverItem;
//# sourceMappingURL=documentation.js.map