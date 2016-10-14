// rename `data` variable
import * as merge from 'lodash/merge';
import * as reduce from 'lodash/reduce';
import * as mapValues from 'lodash/mapValues';

import callApi from './helpers/callApi';
import createShelfConstants from './helpers/createShelfConstants';
import createShelfReducer from './helpers/createShelfReducer';
import createShelfSaga from './helpers/createShelfSaga';
import createShelfActions from './helpers/createShelfActions';

import createObject from './utils/createObject';
import assign from './utils/assign';

/* import { IApiConfigurationList, IApiConfiguration } from './interfaces'; */

export function createApis(apisConfigList) {
  return mapValues(apisConfigList, (inputConfig, name) => {
    const config = assign({
      shouldCreateSaga: true,
    }, inputConfig);

    const { url, method, schema } = config;

    const callApiWrapper = requestPayload => callApi(url, method, requestPayload);
    const constants = createShelfConstants(name);
    const actionsCreators = createShelfActions(constants);
    const reducer = createShelfReducer(constants);
    const saga = createShelfSaga(actionsCreators, callApiWrapper, schema);

    return {
      constants,
      actionsCreators,
      reducer,
      saga,
      callApiWrapper,
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
  return reduce(apis, (acc, {
    reducer,
    config: {
      state: { path } = {},
    }
  }) => (
    !path ? acc : merge({}, acc, createObject(path, reducer))
  ), {});
}

export function handleActions(apis) {
  return mapValues(apis, api => api.actionsCreators);
}

export function handleConstants(apis) {
  return reduce(apis, (acc, api: any) => assign(
    acc,
    api.constants.reduce((acc, c) => assign(acc, { [c]: c }), {}),
  ), {});
}
