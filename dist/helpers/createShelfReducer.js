"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var assign_1 = require('../utils/assign');
var createReducer_1 = require('./createReducer');
/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */
var createShelfReducer = function createShelfReducer(_ref, customState, customMap) {
    var _ref2 = _slicedToArray(_ref, 3);

    var request = _ref2[0];
    var success = _ref2[1];
    var failure = _ref2[2];

    var _assign_1$default;

    return createReducer_1.default(assign_1.default(customState, {
        isFetching: false,
        // may be remove these undefined props, as we are will be using interface
        lastUpdated: undefined,
        error: undefined,
        data: undefined
    }), assign_1.default(customMap, (_assign_1$default = {}, _defineProperty(_assign_1$default, request, function (state, payload) {
        return assign_1.default(state, {
            isFetching: true
        });
    }), _defineProperty(_assign_1$default, success, function (state, payload) {
        return assign_1.default(state, {
            isFetching: false,
            lastUpdated: payload.receivedAt,
            error: undefined,
            data: payload.result
        });
    }), _defineProperty(_assign_1$default, failure, function (state, payload) {
        return assign_1.default(state, {
            isFetching: false,
            error: payload.message
        });
    }), _assign_1$default)));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfReducer;