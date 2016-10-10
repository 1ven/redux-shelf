/* import { IAction, IActionType } from '../interfaces'; */

const createReducer = function (initialState, map) {
  return (state = initialState, action) => {
    for (let actionType in map) {
      if (actionType === action.type) {
        return map[actionType](state, action.payload);
      }
    }
    return state;
  }
}

/* type IState = any; */

/* type IActionHandler = (state: IState, payload?: any) => IState; */

/* interface IActionHandlersMap { */
/*   [key: IActionType]: IActionHandler, */
/* } */

export default createReducer;
