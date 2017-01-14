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

    const callApiHandler = call || makeCallApiHandlerFromConfig(config, settings);
    const constants = createShelfConstants(name);
    const actionsCreators = createShelfActions(constants);
    const saga = createShelfSaga(actionsCreators, callApiHandler, schema);

    return {
      constants,
      actionsCreators,
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

function handleSagas(apis) {
  return reduce(apis, (acc, api: any) => !api.config.shouldCreateSaga ? acc : [
    ...acc,
    api.saga.watcher(),
  ], []);
}

// rename to `createReducers` and all rest functions or something more logical
function handleReducers(apis, customMaps) {
  return mapValues(apis, (api, name) => createShelfReducer([{
    actionsTypes: api.constants,
  }], undefined, customMaps[name]));
}

function handleSelectors(apis) {
  return mapValues(apis, (_, name) => ({
    getData: (state) => state[name].data,
    getError: (state) => state[name].error,
    isFetching: (state) => state[name].isFetching,
    isError: (state) => !! state[name].error;
  }));
}

function handleActions(apis) {
  return reduce(apis, (acc, api: any, apiName) => assign(acc, {
    [`${apiName}Actions`]: api.actionsCreators,
  }), {});
}

function handleConstants(apis, customConstants?) {
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

  handleSagas,
  handleReducers,
  handleSelectors,
  handleActions,
  handleConstants,

  createCallApiHandler,
  createShelfConstants,
  createShelfReducer,
  createShelfSaga,
  createShelfActions,
  createReducer,

}
