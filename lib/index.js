"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var merge = require('lodash/merge');
var reduce = require('lodash/reduce');
var mapValues = require('lodash/mapValues');
/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */
var utils_1 = require('./utils');
var helpers_1 = require('./helpers');
function createApis(apisConfigList, settings) {
    var apiRoot = settings && settings.apiRoot;
    return mapValues(apisConfigList, function (inputConfig, name) {
        var config = utils_1.assign({
            shouldCreateSaga: true
        }, inputConfig);
        var url = config.url;
        var method = config.method;
        var schema = config.schema;
        var state = config.state;

        var fullUrl = !apiRoot ? url : utils_1.resolveUrl(apiRoot, url);
        var responseMap = state && state.responseMap;
        var customState = state && state.customState;
        var customMap = state && state.customMap;
        var callApiHandler = helpers_1.createCallApiHandler(fullUrl, method);
        var constants = helpers_1.createShelfConstants(name);
        var actionsCreators = helpers_1.createShelfActions(constants);
        var reducer = helpers_1.createShelfReducer(constants, customState, customMap, responseMap);
        var saga = helpers_1.createShelfSaga(actionsCreators, callApiHandler, schema);
        return {
            constants: constants,
            actionsCreators: actionsCreators,
            reducer: reducer,
            saga: saga,
            callApiHandler: callApiHandler,
            name: name,
            config: config
        };
    });
}
exports.createApis = createApis;
function handleSagas(apis) {
    return reduce(apis, function (acc, api) {
        return !api.config.shouldCreateSaga ? acc : [].concat(_toConsumableArray(acc), [api.saga.watcher()]);
    }, []);
}
exports.handleSagas = handleSagas;
function handleReducers(apis) {
    return reduce(apis, function (acc, _ref) {
        var reducer = _ref.reducer;
        var config = _ref.config;

        var path = config.state && config.state.path;
        return !path ? acc : merge({}, acc, utils_1.createObject(path, reducer));
    }, {});
}
exports.handleReducers = handleReducers;
function handleActions(apis) {
    return mapValues(apis, function (api) {
        return api.actionsCreators;
    });
}
exports.handleActions = handleActions;
function handleConstants(apis, customConstants) {
    return utils_1.assign(reduce(apis, function (acc, api) {
        return utils_1.assign(acc, api.constants.reduce(function (acc, c) {
            return utils_1.assign(acc, _defineProperty({}, c, c));
        }, {}));
    }, {}), customConstants);
}
exports.handleConstants = handleConstants;