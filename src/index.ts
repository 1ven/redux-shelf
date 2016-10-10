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

import { IApiConfigurationList, IApiConfiguration } from './interfaces';

export default function createApis(apisConfig: IApiConfigurationList) {
  return mapValues(apisConfig, (data = {
    url,
    name,
    method,
    schema,
    shouldCreateSaga = true,
  }: IApiConfiguration) => ({
    constants: createShelfConstants(name),
    actions: createShelfActions(this.constants),
    reducer: createShelfReducer(this.actions),
    saga: createShelfSaga(this.actions, this.call),
    callApiWrapper: payload => callApi(url, method, schema, payload),
    data,
  }));
}

export function handleSagas(apis) {
  return reduce(apis, api => !api.data.saga ? acc : [
    ...acc,
    api.saga
  ], []);
}

export function handleReducers(apis) {
  return reduce(apis, ({ data: { statePath } }) => (
    !statePath ? acc : merge({}, acc, createObject(statePath))
  ), {});
}

export function handleActions(apis) {
  return mapValues(apis, api => api.actions);
}

export function handleConstants(apis) {
  return reduce(apis, (acc, api) => ({
    ...acc,
    ...(api.constants.reduce((acc, c) => ({
      ...acc, [c]: c
    }), {})),
  }), {});
}
