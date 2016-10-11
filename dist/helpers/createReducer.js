/* import { IAction, IActionType } from '../interfaces'; */
"use strict";

var createReducer = function createReducer(initialState, map) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        for (var actionType in map) {
            if (actionType === action.type) {
                return map[actionType](state, action.payload);
            }
        }
        return state;
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReducer;