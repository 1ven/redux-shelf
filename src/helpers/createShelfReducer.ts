import * as identity from 'lodash/identity';
import assign from '../utils/assign';
import createReducer from './createReducer';

/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */

const createShelfReducer = function(
  [ request, success, failure ]: any,
  customState?,
  customMap?,
  responseMap = identity
) {
  return createReducer(
    assign(customState, {
      isFetching: false,
      // may be remove these undefined props, as we are will be using interface
      lastUpdated: undefined,
      error: undefined,
      data: undefined,
    }),
    assign(customMap, {
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
    })
  );
}

/* interface IState { */
/*   isFetching: boolean, */
/*   lastUpdated?: number, */
/*   error?: string, */
/* } */

export default createShelfReducer;
