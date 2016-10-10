"use strict";
/* import { IActionPayload, IAsyncActionTypes, IAsyncActions } from '../interfaces'; */
const assign_1 = require('../utils/assign');
const createShelfActions = function ([request, success, failure]) {
    return {
        request(payload) {
            return {
                type: request,
                payload,
            };
        },
        success(payload) {
            return {
                type: success,
                payload,
            };
        },
        failure(payload = {}) {
            return {
                type: failure,
                payload: assign_1.default(payload, {
                    message: payload.message || 'Something bad happened',
                }),
            };
        },
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfActions;
