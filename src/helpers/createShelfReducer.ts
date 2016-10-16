import * as identity from 'lodash/identity';
import createReducer from './createReducer';
import { assign } from '../utils';

/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */

const createShelfReducer = function(
  [ request, success, failure ]: any,
  customState?,
  customMap?,
  responseMap = identity
) {
  return createReducer(
    assign({
      isFetching: false,
      // may be remove these undefined props, as we are will be using interface
      lastUpdated: undefined,
      error: undefined,
      data: undefined,
    }, customState),
    {
      [request]: (state, payload) => assign(state, {
        isFetching: true,
      }),
      [success]: (state, payload) => assign(state, {
        isFetching: false,
        lastUpdated: payload.receivedAt,
        error: undefined,
        data: responseMap(payload.result),
      }),
      [failure]: (state, payload) => assign(state, {
        isFetching: false,
        error: payload.message,
      }),
    },
    customMap
  );
}

/* interface IState { */
/*   isFetching: boolean, */
/*   lastUpdated?: number, */
/*   error?: string, */
/* } */

export default createShelfReducer;
