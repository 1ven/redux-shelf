import * as identity from 'lodash/identity';
import createReducer from './createReducer';
import { assign } from '../utils';

/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */

const createShelfReducer = function(
  actionsConfig,
  customState?,
  customMap?
) {

  const map = actionsConfig instanceof Array ? (
    actionsConfig.reduce((acc, {
      actionsTypes,
      responseMap,
    }) => assign(acc, buildMap(actionsTypes, responseMap)), {})
  ) : (
    buildMap(actionsConfig.actionsTypes, actionsConfig.responseMap)
  );

  return createReducer(
    assign({
      isFetching: false,
      // may be remove these undefined props, as we are will be using interface
      lastUpdated: undefined,
      error: undefined,
      data: undefined,
    }, customState),
    map,
    customMap
  );
}

const buildMap = function(
  [ request, success, failure ]: any,
  responseMap = identity,
) {
  return {
    [request]: (state, { payload }) => assign(state, {
      isFetching: true,
    }),
    [success]: (state, { payload }) => assign(state, {
      isFetching: false,
      lastUpdated: payload.receivedAt,
      error: undefined,
      data: responseMap(payload.result),
    }),
    [failure]: (state, { payload }) => assign(state, {
      isFetching: false,
      error: payload.message,
    }),
  };
}

/* interface IState { */
/*   isFetching: boolean, */
/*   lastUpdated?: number, */
/*   error?: string, */
/* } */

export default createShelfReducer;
