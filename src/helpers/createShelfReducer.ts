// at first create tests with this implementation and then refactor it with using createReducer
import assign from '../utils/assign';

import { IAsyncActionTypes, IActionHandlersMap, IAnyObject } from '../interfaces';

function createShelfReducer([request, success, failure]: IAsyncActionTypes, customState?: IAnyObject, customMap?: IActionHandlersMap) {
  return (
    state = assign(customState, {
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    }),
    action = {}
  ) => {
    const { payload } = action;

    if (customMap) {
      for (let actionType in customMap) {
        if (actionType === actionType) {
          return customMap[actionType](state, payload);
        }
      }
    }

    switch (action.type) {
      case request:
        return assign(state, {
          isFetching: true,
        });
      case success:
        return assign(state, {
          isFetching: false,
          lastUpdated: payload.receivedAt,
          error: undefined,
        });
      case failure:
        return assign(state, {
          isFetching: false,
          error: payload.message,
        });
      default:
        return state;
    }
  }
}

export default createShelfReducer;
