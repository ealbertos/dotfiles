"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FontAwesomeVersion;
(function (FontAwesomeVersion) {
    FontAwesomeVersion["v4"] = "4";
    FontAwesomeVersion["V5"] = "5";
})(FontAwesomeVersion = exports.FontAwesomeVersion || (exports.FontAwesomeVersion = {}));
/**
 * Available FontAwesome icon styles.
 * @see https://fontawesome.com/how-to-use
 */
var IconStyle;
(function (IconStyle) {
    IconStyle["solid"] = "solid";
    IconStyle["regular"] = "regular";
    IconStyle["light"] = "light";
    IconStyle["brands"] = "brands";
    IconStyle["duotone"] = "duotone";
    IconStyle["v4"] = "v4";
})(IconStyle = exports.IconStyle || (exports.IconStyle = {}));
/**
 * Available FontAwesome icon style prefixes.
 * @see https://fontawesome.com/how-to-use
 */
exports.iconStylePrefix = {
    [IconStyle.solid]: 'fas',
    [IconStyle.regular]: 'far',
    [IconStyle.light]: 'fal',
    [IconStyle.brands]: 'fab',
    [IconStyle.duotone]: 'fad',
    [IconStyle.v4]: 'fa',
};
exports.availablePrefixes = Object.keys(exports.iconStylePrefix).map(key => exports.iconStylePrefix[key]);
exports.prefix = 'fa-';
//# sourceMappingURL=index.js.map