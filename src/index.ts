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
  return mapValues(apisConfigList, (config, name) => {
    const { url, method, schema, statePath, responsePath, shouldCreateSaga = true } = config;

    return {
      constants: createShelfConstants(name),
      actions: createShelfActions(this.constants),
      reducer: createShelfReducer(this.actions),
      saga: createShelfSaga(this.actions, this.callApiWrapper),
      callApiWrapper: requestPayload => callApi(url, method, schema, requestPayload),
      name,
      config,
    };
  });
}

export function handleSagas(apis) {
  return reduce(apis, (acc, api: any) => !api.config.shouldCreateSaga ? acc : [
    ...acc,
    api.saga
  ], []);
}

export function handleReducers(apis) {
  return reduce(apis, (acc, { config: { statePath } }) => (
    !statePath ? acc : merge({}, acc, createObject(statePath))
  ), {});
}

export function handleActions(apis) {
  return mapValues(apis, api => api.actions);
}

export function handleConstants(apis) {
  return reduce(apis, (acc, api: any) => assign(
    acc,
    api.constants.reduce((acc, c) => assign(acc, { [c]: c }), {}),
  ), {});
}
