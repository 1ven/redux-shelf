// interface is primary

// async constants
/* export const fetchTodos = createAsyncConstants('fetchTodos'); */
// you don't need to create constants

// actions
/* export const fetchTodosActions = createAsyncActions(fetchTodos); */
// you don't need to create custom actions, actions are crating automatically, you just need to import them

// reducers
export const fetchTodosReducer = createAsyncReducer(fetchTodosActions);
