"use strict";

var replaceParams = function replaceParams(pattern, params) {
    return pattern.replace(/:[a-z|A-Z]+/g, function (match) {
        var matchedParam = match.substr(1);
        var value = params[matchedParam];
        if (typeof value === 'undefined') {
            throw new Error("Matched param \"" + matchedParam + "\" is not presented at given object");
        }
        return value;
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = replaceParams;