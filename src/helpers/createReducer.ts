/* import { IAction, IActionType } from '../interfaces'; */

/* type IState = any; */

/* type IActionHandler = (state: IState, payload?: any) => IState; */

/* interface IActionHandlersMap { */
/*   [key: IActionType]: IActionHandler, */
/* } */

import * as reduce from 'lodash/reduce';

const transformState = function(state, action, map) {
  return reduce(map, (prevState, transformer: ITransformer, actionType) => (
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
    ), state)
  );
}

/* type ITransformer<S> (state: S, payload: any) => S; */
type ITransformer = (state: any, payload: any) => any;

export default createReducer;
