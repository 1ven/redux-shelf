"use strict";
// rename `data` variable
const merge = require('lodash/merge');
const reduce = require('lodash/reduce');
const mapValues = require('lodash/mapValues');
const callApi_1 = require('./helpers/callApi');
const createShelfConstants_1 = require('./helpers/createShelfConstants');
const createShelfReducer_1 = require('./helpers/createShelfReducer');
const createShelfSaga_1 = require('./helpers/createShelfSaga');
const createShelfActions_1 = require('./helpers/createShelfActions');
const createObject_1 = require('./utils/createObject');
const assign_1 = require('./utils/assign');
/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */
function createApis(apisConfigList) {
    return mapValues(apisConfigList, (config, name) => {
        const { url, method, schema, statePath, responsePath, shouldCreateSaga = true } = config;
        const callApiWrapper = requestPayload => callApi_1.default(url, method, schema, requestPayload);
        const constants = createShelfConstants_1.default(name);
        const actions = createShelfActions_1.default(constants);
        const reducer = createShelfReducer_1.default(actions);
        const saga = createShelfSaga_1.default(actions, callApiWrapper);
        return {
            constants,
            actions,
            reducer,
            saga,
            callApiWrapper,
            name,
            config,
        };
    });
}
exports.createApis = createApis;
function handleSagas(apis) {
    return reduce(apis, (acc, api) => !api.config.shouldCreateSaga ? acc : [
        ...acc,
        api.saga
    ], []);
}
exports.handleSagas = handleSagas;
function handleReducers(apis) {
    return reduce(apis, (acc, { config: { statePath } }) => (!statePath ? acc : merge({}, acc, createObject_1.default(statePath))), {});
}
exports.handleReducers = handleReducers;
function handleActions(apis) {
    return mapValues(apis, api => api.actions);
}
exports.handleActions = handleActions;
function handleConstants(apis) {
    return reduce(apis, (acc, api) => assign_1.default(acc, api.constants.reduce((acc, c) => assign_1.default(acc, { [c]: c }), {})), {});
}
exports.handleConstants = handleConstants;
