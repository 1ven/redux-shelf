import assign from '../utils/assign';
import createReducer from './createReducer';

/* import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces'; */

const createShelfReducer = function(
  [request, success, failure],
  customState?,
  customMap?
) {
  return createReducer(
    assign(customState, {
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    }),
    assign(customMap, {
      [request]: (state, payload) => assign(state, {
        isFetching: true,
      }),
      [success]: (state, payload) => assign(state, {
        isFetching: false,
        lastUpdated: payload.receivedAt,
        error: undefined,
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
