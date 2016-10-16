/* /1* import { IAction, IActionType } from '../interfaces'; *1/ */

/* /1* type IState = any; *1/ */

/* /1* type IActionHandler = (state: IState, payload?: any) => IState; *1/ */

/* /1* interface IActionHandlersMap { *1/ */
/* /1*   [key: IActionType]: IActionHandler, *1/ */
/* /1* } *1/ */

// 6. possible provide full action to transformer instead of payload */

import * as reduce from 'lodash/reduce';

const transformState = function(state, action, map) {
  return reduce(map, (prevState, transformer, actionType) => (
    actionType === action.type ? (
      transformer(prevState, action.payload)
    ) : (
      prevState
    )
  ), state);
}

const createReducer = function(initialState, ...maps) {
  return (state = initialState, action) => (
    reduce(maps, (prevState, map) => (
      transformState(prevState, action, map)
    ), state);
  );
}

export default createReducer;
