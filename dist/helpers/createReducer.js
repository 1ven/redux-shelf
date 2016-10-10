/* import { IAction, IActionType } from '../interfaces'; */
"use strict";
const createReducer = function (initialState, map) {
    return (state = initialState, action) => {
        for (let actionType in map) {
            if (actionType === action.type) {
                return map[actionType](state, action.payload);
            }
        }
        return state;
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReducer;
