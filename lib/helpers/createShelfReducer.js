"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var identity = require('lodash/identity');
var createReducer_1 = require('./createReducer');
var utils_1 = require('../utils');
/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */
var createShelfReducer = function createShelfReducer(actionsConfig, customState, customMap) {
    var map = actionsConfig instanceof Array ? actionsConfig.reduce(function (acc, _ref) {
        var actionsTypes = _ref.actionsTypes;
        var responseMap = _ref.responseMap;
        return utils_1.assign(acc, buildMap(actionsTypes, responseMap));
    }, {}) : buildMap(actionsConfig.actionsTypes, actionsConfig.responseMap);
    return createReducer_1.default(utils_1.assign({
        isFetching: false,
        // may be remove these undefined props, as we are will be using interface
        lastUpdated: undefined,
        error: undefined,
        data: undefined
    }, customState), map, customMap);
};
var buildMap = function buildMap(_ref2) {
    var _ref7;

    var _ref3 = _slicedToArray(_ref2, 3);

    var request = _ref3[0];
    var success = _ref3[1];
    var failure = _ref3[2];
    var responseMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

    return _ref7 = {}, _defineProperty(_ref7, request, function (state, _ref4) {
        var payload = _ref4.payload;
        return utils_1.assign(state, {
            isFetching: true
        });
    }), _defineProperty(_ref7, success, function (state, _ref5) {
        var payload = _ref5.payload;
        return utils_1.assign(state, {
            isFetching: false,
            lastUpdated: payload.receivedAt,
            error: undefined,
            data: responseMap(payload.result)
        });
    }), _defineProperty(_ref7, failure, function (state, _ref6) {
        var payload = _ref6.payload;
        return utils_1.assign(state, {
            isFetching: false,
            error: payload.message
        });
    }), _ref7;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfReducer;