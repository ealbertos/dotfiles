"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("../helper/glob");
const RegexpHelpers = require("../helper/regex");
const _1 = require(".");
class InsertionTemplate {
    constructor(pattern, template) {
        this.alias = pattern;
        this.pattern = glob_1.globPatternToRegExp(pattern);
        this.template = template;
        this.templatePattern = new RegExp(RegexpHelpers.escape(template)
            .replace(/\\{style\\}/g, `(${_1.availablePrefixes.join('|')})`)
            .replace(/\\{prefix\\}/g, _1.prefix)
            .replace(/\\{name\\}/g, '[\\w-]+'));
    }
    /**
     * Checks whether or not the insertion template is configured to be used with the document.
     * @param document
     */
    matches(document) {
        return RegexpHelpers.test(document.fileName, this.pattern);
    }
    /**
     * Renders an icon with the template by replacing all placeholders.
     * @param icon
     */
    render(icon) {
        return this.template
            .replace(/{style}/g, icon.style)
            .replace(/{prefix}/g, icon.prefix)
            .replace(/{name}/g, icon.name);
    }
    /**
     * Finds the first insertion template from a list that matches the document.
     * @param document
     * @param templates
     */
    static resolve(document, templates) {
        for (const template of templates) {
            if (template.matches(document)) {
                return template;
            }
        }
        return null;
    }
}
exports.InsertionTemplate = InsertionTemplate;
//# sourceMappingURL=transformation.js.map