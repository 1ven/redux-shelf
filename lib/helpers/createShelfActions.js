"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", { value: true });
/* import { IActionPayload, IAsyncActionTypes, IAsyncActions } from '../interfaces'; */
var utils_1 = require("../utils");
var createShelfActions = function createShelfActions(_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        _request = _ref2[0],
        _success = _ref2[1],
        _failure = _ref2[2];

    return {
        request: function request(payload) {
            return {
                type: _request,
                payload: payload
            };
        },
        success: function success(payload) {
            return {
                type: _success,
                payload: payload
            };
        },
        failure: function failure() {
            var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return {
                type: _failure,
                payload: utils_1.assign(payload, {
                    message: payload.message || 'Something bad happened'
                })
            };
        }
    };
};
exports.default = createShelfActions;