"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const string_1 = require("./string");
describe('string helpers', () => {
    it('setCharacterCase', () => {
        // Standard
        assert.strictEqual(string_1.setCharacterCase('', 0, 'lower'), '');
        assert.strictEqual(string_1.setCharacterCase('A', 0, 'lower'), 'a');
        assert.strictEqual(string_1.setCharacterCase('a', 0, 'lower'), 'a');
        assert.strictEqual(string_1.setCharacterCase('a', 0, 'upper'), 'A');
        // Non-alphabets
        assert.strictEqual(string_1.setCharacterCase('_', 0, 'upper'), '_');
        assert.strictEqual(string_1.setCharacterCase('_', 0, 'lower'), '_');
        // Unicode
        assert.strictEqual(string_1.setCharacterCase('ä', 0, 'upper'), 'Ä');
        assert.strictEqual(string_1.setCharacterCase('Ö', 0, 'lower'), 'ö');
        assert.strictEqual(string_1.setCharacterCase('💩', 0, 'upper'), '💩');
        assert.strictEqual(string_1.setCharacterCase('💩', 0, 'lower'), '💩');
        // Words
        assert.strictEqual(string_1.setCharacterCase('fooBar', 0, 'lower'), 'fooBar');
        assert.strictEqual(string_1.setCharacterCase('fooBar', 0, 'upper'), 'FooBar');
    });
});
//# sourceMappingURL=string.spec.js.map