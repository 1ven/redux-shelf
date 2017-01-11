"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var reduce = require('lodash/reduce');
var mapValues = require('lodash/mapValues');
/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */
var utils_1 = require('./utils');
exports.assign = utils_1.assign;
exports.camelToSnake = utils_1.camelToSnake;
exports.createObject = utils_1.createObject;
exports.replaceParams = utils_1.replaceParams;
exports.resolveUrl = utils_1.resolveUrl;
var helpers_1 = require('./helpers');
exports.createCallApiHandler = helpers_1.createCallApiHandler;
exports.createShelfConstants = helpers_1.createShelfConstants;
exports.createShelfReducer = helpers_1.createShelfReducer;
exports.createShelfSaga = helpers_1.createShelfSaga;
exports.createShelfActions = helpers_1.createShelfActions;
exports.createReducer = helpers_1.createReducer;
function createApis(apisConfigList, settings) {
    return mapValues(apisConfigList, function (inputConfig, name) {
        var config = utils_1.assign({
            shouldCreateSaga: true
        }, inputConfig);
        var schema = config.schema;
        var state = config.state;
        var call = config.call;

        var callApiHandler = call || makeCallApiHandlerFromConfig(config, settings);
        var constants = helpers_1.createShelfConstants(name);
        var actionsCreators = helpers_1.createShelfActions(constants);
        var saga = helpers_1.createShelfSaga(actionsCreators, callApiHandler, schema);
        return {
            constants: constants,
            actionsCreators: actionsCreators,
            saga: saga,
            callApiHandler: callApiHandler,
            name: name,
            config: config
        };
    });
}
exports.createApis = createApis;
function makeCallApiHandlerFromConfig(config, settings) {
    var method = config.method;
    var url = config.url;

    var apiRoot = settings && settings.apiRoot;
    var requestConfig = settings && settings.requestConfig;
    var buildGenericParams = settings && settings.params;
    var buildGenericHeaders = settings && settings.headers;
    var customBuildGenericHeaders = config.headers || buildGenericHeaders;
    var customRoot = config.root || apiRoot;
    var fullUrl = !customRoot ? url : utils_1.resolveUrl(customRoot, url);
    return helpers_1.createCallApiHandler(fullUrl, method, customBuildGenericHeaders, buildGenericParams, requestConfig);
}
function handleSagas(apis) {
    return reduce(apis, function (acc, api) {
        return !api.config.shouldCreateSaga ? acc : [].concat(_toConsumableArray(acc), [api.saga.watcher()]);
    }, []);
}
exports.handleSagas = handleSagas;
// rename to `createReducers` and all rest functions or something more logical
function handleReducers(apis, customMaps) {
    return mapValues(apis, function (api, name) {
        return helpers_1.createShelfReducer({
            actionTypes: api.constants
        }, undefined, customMaps[name]);
    });
}
exports.handleReducers = handleReducers;
function handleActions(apis) {
    return reduce(apis, function (acc, api, apiName) {
        return utils_1.assign(acc, _defineProperty({}, apiName + 'Actions', api.actionsCreators));
    }, {});
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