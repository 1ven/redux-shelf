"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */
var createShelfConstants = function createShelfConstants(name) {
    var n = utils_1.camelToSnake(name).toUpperCase();
    return [n + "_REQUEST", n + "_SUCCESS", n + "_FAILURE"];
};
exports.default = createShelfConstants;