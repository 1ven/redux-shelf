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
  const apiRoot = settings && settings.apiRoot;
  const genericHeaders = settings && settings.headers;

  return mapValues(apisConfigList, (inputConfig, name) => {
    const config = assign({
      shouldCreateSaga: true,
    }, inputConfig);

    const { url, method, schema, state } = config;
    const fullUrl = !apiRoot ? url : resolveUrl(apiRoot, url);
    const responseMap = state && state.responseMap;
    const customState = state && state.customState;
    const customMap = state && state.customMap;

    const callApiHandler = createCallApiHandler(fullUrl, method, [
      genericHeaders,
    ]);
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
