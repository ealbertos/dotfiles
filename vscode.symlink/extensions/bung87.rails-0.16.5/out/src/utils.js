Object.defineProperty(exports, "__esModule", {
    value: !0
});

const constants_1 = require("./constants");

exports.dectFileType = function dectFileType(filePath) {
    for (const [key, value] of constants_1.FileTypeRelPath) if (filePath.indexOf(value) >= 0) return key;
    return constants_1.FileType.Unkown;
}, exports.isPositionInString = function isPositionInString(document, position) {
    const lineTillCurrentPosition = document.lineAt(position.line).text.substr(0, position.character);
    let doubleQuotesCnt = (lineTillCurrentPosition.match(/\"/g) || []).length;
    return doubleQuotesCnt -= (lineTillCurrentPosition.match(/\\\"/g) || []).length, 
    doubleQuotesCnt % 2 == 1;
}, exports.flatten = function flatten(arr) {
    return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
};