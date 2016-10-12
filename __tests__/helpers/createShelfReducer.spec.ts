import * as deepFreeze from 'deep-freeze';
import * as assign from 'lodash/assign';
import createShelfReducer from '../../src/helpers/createShelfReducer';

const actions = [
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE',
];
describe('createShelfReducer', () => {
  it('should create reducer which returns initial state for async data', () => {
    const reducer = createShelfReducer(actions);

    expect(reducer(undefined, {
      type: '',
    })).toEqual({
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should create reducer which handles `request` action', () => {
    const reducer = createShelfReducer(actions);
    const previousState = {
      isFetching: false,
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actions[0],
    })).toEqual({
      isFetching: true,
    });
  });

  it('should create reducer which handles `success` action', () => {
    const reducer = createShelfReducer(actions);
    const previousState = {
      isFetching: true,
      error: 'message',
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actions[1],
      payload: {
        receivedAt: 1,
        result: ['item_1', 'item_2'],
      },
    })).toEqual({
      isFetching: false,
      error: undefined,
      lastUpdated: 1,
      data: ['item_1', 'item_2'],
    });
  });

  it('should create reducer which handles `failure` action', () => {
    const reducer = createShelfReducer(actions);
    const previousState = {
      isFetching: true,
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actions[2],
      payload: new Error('Something bad happened'),
    })).toEqual({
      isFetching: false,
      error: 'Something bad happened',
    });
  });

  it('should create reducer with custom state', () => {
    const reducer = createShelfReducer(actions, {
      currentPage: 0,
    });

    expect(reducer(undefined, { type: '' })).toEqual({
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
      currentPage: 0,
    });
  });

  it('should create reducer with custom action types mappings', () => {
    const reducer = createShelfReducer(actions, {
      todos: ['first'],
    }, {
      'CREATE_TODO_SUCCESS': (state, payload) => assign({}, state, {
        todos: [...state.todos, payload.todo],
      }),
    });

    expect(reducer(undefined, {
      type: 'CREATE_TODO_SUCCESS',
      payload: {
        todo: 'second',
      },
    })).toEqual({
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
      todos: ['first', 'second'],
    });
  });
});
