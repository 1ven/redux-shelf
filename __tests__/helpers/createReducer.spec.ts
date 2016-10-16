import * as assign from 'lodash/assign';
import * as deepFreeze from 'deep-freeze';
import createReducer from '../../src/helpers/createReducer';

const reducer = createReducer({
  todos: [],
  isFetching: false,
  error: undefined,
}, {
  'FETCH_TODOS_REQUEST': (state, payload) => assign({}, state, {
    isFetching: true,
  }),
  'FETCH_TODOS_SUCCESS': (state, payload) => assign({}, state, {
    isFetching: false,
    todos: [...state.todos, payload.todos],
  }),
  'FETCH_TODOS_FAILURE': (state, payload) => assign({}, state, {
    isFetching: false,
    error: payload.error,
  }),
});

describe('createReducer', () => {
  it('should create reducer which returns initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      todos: [],
      isFetching: false,
      error: undefined,
    });
  });

  it('should create reducer which not mutate state or action objects', () => {
    const state = {
      todos: [],
      isFetching: false,
      error: undefined,
    };
    const action = {
      type: 'FETCH_TODOS_REQUEST',
    };

    deepFreeze(state);
    deepFreeze(action);

    reducer(state, action);
  });

  it('should create reducer which returns given state, if provided action doesn\'t matches declared any', () => {
    const state = {
      todos: [],
      isFetching: true,
    };
    expect(reducer(state, { type: '' })).toBe(state);
  });

  it('should create reducer which returns new state handled by given action, if this action is matches declared any ', () => {
    expect(reducer({
      todos: ['first todo'],
      isFetching: true,
    }, {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {
        todos: 'second todo',
      },
    })).toEqual({
      todos: ['first todo', 'second todo'],
      isFetching: false,
    });
  });

  it('should create reducer which returns new state handled by multiple actions with same action types', () => {
    const reducer = createReducer({
      data: [],
    }, {
      'ADD_DATA': (state, payload) => assign({}, state, {
        data: [...state.data, payload + 1],
      }),
    }, {
      'ADD_DATA': (state, payload) => assign({}, state, {
        data: [...state.data, payload + 4],
      }),
    });

    expect(reducer(undefined, {
      type: 'ADD_DATA',
      payload: 1,
    })).toEqual({
      data: [2, 5],
    });
  });
});
