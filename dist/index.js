"use strict";
// rename `data` variable

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var merge = require('lodash/merge');
var reduce = require('lodash/reduce');
var mapValues = require('lodash/mapValues');
var callApi_1 = require('./helpers/callApi');
var createShelfConstants_1 = require('./helpers/createShelfConstants');
var createShelfReducer_1 = require('./helpers/createShelfReducer');
var createShelfSaga_1 = require('./helpers/createShelfSaga');
var createShelfActions_1 = require('./helpers/createShelfActions');
var createObject_1 = require('./utils/createObject');
var assign_1 = require('./utils/assign');
/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */
function createApis(apisConfigList) {
    return mapValues(apisConfigList, function (inputConfig, name) {
        var config = assign_1.default({
            shouldCreateSaga: true
        }, inputConfig);
        var url = config.url;
        var method = config.method;
        var schema = config.schema;

        var callApiWrapper = function callApiWrapper(requestPayload) {
            return callApi_1.default(url, method, schema, requestPayload);
        };
        var constants = createShelfConstants_1.default(name);
        var actionsCreators = createShelfActions_1.default(constants);
        var reducer = createShelfReducer_1.default(constants);
        var saga = createShelfSaga_1.default(actionsCreators, callApiWrapper);
        return {
            constants: constants,
            actionsCreators: actionsCreators,
            reducer: reducer,
            saga: saga,
            callApiWrapper: callApiWrapper,
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
        var statePath = _ref.config.statePath;
        return !statePath ? acc : merge({}, acc, createObject_1.default(statePath, reducer));
    }, {});
}
exports.handleReducers = handleReducers;
function handleActions(apis) {
    return mapValues(apis, function (api) {
        return api.actionsCreators;
    });
}
exports.handleActions = handleActions;
function handleConstants(apis) {
    return reduce(apis, function (acc, api) {
        return assign_1.default(acc, api.constants.reduce(function (acc, c) {
            return assign_1.default(acc, _defineProperty({}, c, c));
        }, {}));
    }, {});
}
exports.handleConstants = handleConstants;