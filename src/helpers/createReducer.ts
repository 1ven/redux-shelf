/* import { IAction, IActionType } from '../interfaces'; */

/* type IState = any; */

/* interface IActionHandlersMap { */
/*   [key: IActionType]: IActionHandler, */
/* } */

import reduce = require('lodash/reduce');

const transformState = function(state, action, map) {
  return reduce(map, (prevState, transformer: ITransformer, actionType) => (
    actionType === action.type ? (
      transformer(prevState, action)
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

/* type ITransformer<S> (state: S, action: any) => S; */
type ITransformer = (state: any, action: any) => any;

export default createReducer;
