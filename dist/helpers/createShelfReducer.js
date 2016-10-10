"use strict";
const assign_1 = require('../utils/assign');
const createReducer_1 = require('./createReducer');
/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */
const createShelfReducer = function ([request, success, failure], customState, customMap) {
    return createReducer_1.default(assign_1.default(customState, {
        isFetching: false,
        lastUpdated: undefined,
        error: undefined,
    }), assign_1.default(customMap, {
        [request]: (state, payload) => assign_1.default(state, {
            isFetching: true,
        }),
        [success]: (state, payload) => assign_1.default(state, {
            isFetching: false,
            lastUpdated: payload.receivedAt,
            error: undefined,
        }),
        [failure]: (state, payload) => assign_1.default(state, {
            isFetching: false,
            error: payload.message,
        }),
    }));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfReducer;
