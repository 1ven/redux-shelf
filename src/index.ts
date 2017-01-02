import * as merge from 'lodash/merge';
import * as reduce from 'lodash/reduce';
import * as mapValues from 'lodash/mapValues';

/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */

import {
  assign,
  camelToSnake,
  createObject,
  replaceParams,
  resolveUrl,
} from './utils';

import {
  createCallApiHandler,
  createShelfConstants,
  createShelfReducer,
  createShelfSaga,
  createShelfActions,
  createReducer,
} from './helpers';

export function createApis(apisConfigList, settings?) {
  return mapValues(apisConfigList, (inputConfig, name) => {
    const config = assign({
      shouldCreateSaga: true,
    }, inputConfig);

    const { schema, state, call } = config;
    const responseMap = state && state.responseMap;
    const customState = state && state.customState;
    const customMap = state && state.customMap;

    const callApiHandler = call || makeCallApiHandlerFromConfig(config, settings);
    const constants = createShelfConstants(name);
    const actionsCreators = createShelfActions(constants);
    const reducer = createShelfReducer({
      actionsTypes: constants,
      responseMap,
    }, customState, customMap);
    const saga = createShelfSaga(actionsCreators, callApiHandler, schema);

    return {
      constants,
      actionsCreators,
      reducer,
      saga,
      callApiHandler,
      name,
      config,
    };
  });
}

function makeCallApiHandlerFromConfig(config, settings) {
  const { method, url } = config;
  const apiRoot = settings && settings.apiRoot;
  const requestConfig = settings && settings.requestConfig;
  const buildGenericParams = settings && settings.params;
  const buildGenericHeaders = settings && settings.headers;
  const customBuildGenericHeaders = config.headers || buildGenericHeaders;
  const customRoot = config.root || apiRoot;
  const fullUrl = !customRoot ? url : resolveUrl(customRoot, url);

  return createCallApiHandler(fullUrl, method, customBuildGenericHeaders, buildGenericParams, requestConfig);
}

export function handleSagas(apis) {
  return reduce(apis, (acc, api: any) => !api.config.shouldCreateSaga ? acc : [
    ...acc,
    api.saga.watcher(),
  ], []);
}

export function handleReducers(apis) {
  return reduce(apis, (acc, { reducer, config }) => {
    const path = config.state && config.state.path;
    return !path ? acc : merge({}, acc, createObject(path, reducer));
  }, {});
}

export function handleActions(apis) {
  return reduce(apis, (acc, api: any, apiName) => assign(acc, {
    [`${apiName}Actions`]: api.actionsCreators,
  }), {});
}

export function handleConstants(apis, customConstants?) {
  return assign(
    reduce(apis, (acc, api: any) => assign(
      acc,
      api.constants.reduce((acc, c) => assign(acc, { [c]: c }), {}),
    ), {}),
    customConstants
  );
}

export {

  assign,
  camelToSnake,
  createObject,
  replaceParams,
  resolveUrl,

  createCallApiHandler,
  createShelfConstants,
  createShelfReducer,
  createShelfSaga,
  createShelfActions,
  createReducer,

}
