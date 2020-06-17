"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function test(input, regex) {
    const result = regex.test(input);
    // Allows re-using the regex in ase the regex contains g flag
    /** @see https://stackoverflow.com/a/1520853 */
    regex.lastIndex = 0;
    return result;
}
exports.test = test;
/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping */
function escape(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
exports.escape = escape;
//# sourceMappingURL=regex.js.map