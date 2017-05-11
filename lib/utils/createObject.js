"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var createObject = function createObject(path) {
    var endpointValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var propSeparator = '.';
    if (path.startsWith(propSeparator)) {
        throw new Error("Path can't starts with " + propSeparator);
    }
    if (path.endsWith(propSeparator)) {
        throw new Error("Path can't ends with " + propSeparator);
    }
    if (!path.includes(propSeparator)) {
        return _defineProperty({}, path, endpointValue);
    }
    var firstSeparatorIndex = path.indexOf(propSeparator);
    var head = path.slice(0, firstSeparatorIndex);
    var tail = path.slice(firstSeparatorIndex + 1);
    return _defineProperty({}, head, createObject(tail, endpointValue));
};
exports.default = createObject;