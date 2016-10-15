"use strict";

var resolveUrl = function resolveUrl(root, pathname) {
    var rootWihoutTrailingSlash = root.slice(-1) !== '/' ? root : root.slice(0, -1);
    var pathnameWithoutLeadingSlash = pathname[0] !== '/' ? pathname : pathname.slice(1);
    return rootWihoutTrailingSlash + '/' + pathnameWithoutLeadingSlash;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resolveUrl;