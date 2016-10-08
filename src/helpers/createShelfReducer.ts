import assign from '../utils/assign';
import createReducer from './createReducer';

import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces';

function createShelfReducer(
  [request, success, failure]: IAsyncActionTypes,
  customState?: IAnyObject,
  customMap?: IActionHandlersMap
) {
  return createReducer(
    assign(customState, {
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    }),
    assign(customMap, {
      [request]: (state: IState, payload: IActionPayload) => assign(state, {
        isFetching: true,
      }),
      [success]: (state: IState, payload: IActionPayload) => assign(state, {
        isFetching: false,
        lastUpdated: payload.receivedAt,
        error: undefined,
      }),
      [failure]: (state: IState, payload: IActionPayload) => assign(state, {
        isFetching: false,
        error: payload.message,
      }),
    })
  );
}

interface IState {
  isFetching: boolean,
  lastUpdated?: number,
  error?: string,
}

export default createShelfReducer;
