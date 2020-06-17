"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
/** Converts a glob pattern to a RegExp pattern. */
function globPatternToRegExp(pattern, options) {
    // Unline glob-to-regexp package, this one:
    // - makes directory separators universal and optional (/ or \ turns into \?|/?) 
    const rules = [
        [/\*/g, '.*'],
        [/\*\*/g, '.*'],
        [/\\|\//g, '\\?|\/?'],
    ];
    for (const rule of rules) {
        const [find, replace] = rule;
        pattern = pattern.replace(find, replace);
    }
    return new RegExp(`^${pattern}$`, config_1.getOrDefault(options, 'flags', 'gi'));
}
exports.globPatternToRegExp = globPatternToRegExp;
//# sourceMappingURL=glob.js.map