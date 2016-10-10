"use strict";
const camelToSnake_1 = require('../utils/camelToSnake');
/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */
const createShelfConstants = function (name) {
    const n = camelToSnake_1.default(name).toUpperCase();
    return [
        `${n}_REQUEST`,
        `${n}_SUCCESS`,
        `${n}_FAILURE`,
    ];
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfConstants;
