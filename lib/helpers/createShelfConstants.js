"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */
var createShelfConstants = function createShelfConstants(name, namespace) {
    var ns = namespace ? namespace + '_' : '';
    var n = utils_1.camelToSnake(ns + name).toUpperCase();
    return [n + "_REQUEST", n + "_SUCCESS", n + "_FAILURE"];
};
exports.default = createShelfConstants;