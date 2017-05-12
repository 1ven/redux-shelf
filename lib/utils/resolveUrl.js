"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var resolveUrl = function resolveUrl(root, pathname) {
    var rootWithoutTrailingSlash = root.slice(-1) !== '/' ? root : root.slice(0, -1);
    var pathnameWithoutLeadingSlash = pathname[0] !== '/' ? pathname : pathname.slice(1);
    return rootWithoutTrailingSlash + '/' + pathnameWithoutLeadingSlash;
};
exports.default = resolveUrl;