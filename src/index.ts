// rename `data` variable
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import mapValues from 'lodash/mapValues';

import callApi from './helpers/callApi';
import createShelfConstants from './helpers/createShelfConstants';
import createShelfReducer from './helpers/createShelfReducer';
import createShelfSaga from './helpers/createShelfSaga';
import createShelfActions from './helpers/createShelfActions';

import createObject from './utils/createObject';

export default function createApis(config) {
  return mapValues(config, (data = { url, name, method, schema, saga = true }) => ({
    constants: createShelfConstants(name),
    actions: createShelfActions(this.constants),
    reducer: createShelfReducer(this.actions),
    saga: createShelfSaga(this.actions, this.call),
    call: params => callApi(url, method, schema, params),
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
