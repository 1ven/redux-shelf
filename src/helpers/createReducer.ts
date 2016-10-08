import { IAction, IActionType } from '../interfaces';

function createReducer(initialState: IState, map: IActionHandlersMap) {
  return (state: IState = initialState, action: IAction) => {
    for (let actionType: IActionType in map) {
      if (actionType === action.type) {
        return map[actionType](state, action.payload);
      }
    }
    return state;
  }
}

type IState = any;

type IActionHandler = (state: IState, payload?: any) => IState;

interface IActionHandlersMap {
  [key: IActionType]: IActionHandler,
}

export default createReducer;
