import * as deepFreeze from 'deep-freeze';
import * as assign from 'lodash/assign';
import { createShelfReducer } from '../../src/helpers';

const actionsTypes = [
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE',
];

describe('createShelfReducer', () => {
  it('should create reducer which returns initial state for async data', () => {
    const reducer = createShelfReducer({ actionsTypes });

    expect(reducer(undefined, {
      type: '',
    })).toEqual({
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    });
  });

  it('should create reducer which handles `request` action', () => {
    const reducer = createShelfReducer({ actionsTypes });
    const previousState = {
      isFetching: false,
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actionsTypes[0],
    })).toEqual({
      isFetching: true,
    });
  });

  it('should create reducer which handles `success` action', () => {
    const reducer = createShelfReducer({ actionsTypes });
    const previousState = {
      isFetching: true,
      error: 'message',
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actionsTypes[1],
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
    const reducer = createShelfReducer({ actionsTypes });
    const previousState = {
      isFetching: true,
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actionsTypes[2],
      payload: new Error('Something bad happened'),
    })).toEqual({
      isFetching: false,
      error: 'Something bad happened',
    });
  });

  it('should create reducer with custom state', () => {
    const reducer = createShelfReducer({ actionsTypes }, {
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
    const reducer = createShelfReducer({ actionsTypes }, {
      todos: ['first'],
    }, {
      'CREATE_TODO_SUCCESS': (state, { payload }) => assign({}, state, {
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

  it('should create reducer with custom action types mappings, which contains already mapping action type', () => {
    const reducer = createShelfReducer({ actionsTypes }, undefined, {
      [actionsTypes[1]]: state => assign({}, state, {
        value: 'some additional value',
      }),
    });

    const previousState = {
      isFetching: true,
      error: 'message',
    };

    deepFreeze(previousState);

    expect(reducer(previousState, {
      type: actionsTypes[1],
      payload: {
        receivedAt: 1,
        result: ['item_1', 'item_2'],
      },
    })).toEqual({
      isFetching: false,
      error: undefined,
      lastUpdated: 1,
      data: ['item_1', 'item_2'],
      value: 'some additional value',
    });
  });

  it('should create reducer, which wraps `data` with provided `responseMap` function while handling SUCCESS action', () => {
    const reducer = createShelfReducer({
      actionsTypes,
      responseMap: response => response.user,
    }, undefined, undefined);

    expect(reducer(undefined, {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {
        result: {
          user: 'test user',
          otherData: 'some other data',
        },
      },
    }).data).toBe('test user');
  });

  it('should create reducer, which accepts an array of handled action types', () => {
    const reducer = createShelfReducer([{
      actionsTypes,
    }, {
      actionsTypes: [
        'CREATE_TODO_REQUEST',
        'CREATE_TODO_SUCCESS',
        'CREATE_TODO_FAILURE',
      ],
    }]);

    expect(reducer(undefined, {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {
        result: {
          someData: 'some',
        },
        receivedAt: 1,
      },
    })).toEqual({
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
      data: {
        someData: 'some',
      },
    });

    expect(reducer(undefined, {
      type: 'CREATE_TODO_SUCCESS',
      payload: {
        result: {
          anotherData: 'another',
        },
        receivedAt: 1,
      },
    })).toEqual({
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
      data: {
        anotherData: 'another',
      },
    });
  });

  it('should create reducer, which accepts an array of handled action types with response mappings', () => {
    const reducer = createShelfReducer([{
      actionsTypes,
      responseMap: response => response.someData,
    }, {
      actionsTypes: [
        'CREATE_TODO_REQUEST',
        'CREATE_TODO_SUCCESS',
        'CREATE_TODO_FAILURE',
      ],
      responseMap: response => response.anotherData,
    }]);

    expect(reducer(undefined, {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {
        result: {
          someData: 'some',
        },
        receivedAt: 1,
      },
    })).toEqual({
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
      data: 'some',
    });

    expect(reducer(undefined, {
      type: 'CREATE_TODO_SUCCESS',
      payload: {
        result: {
          anotherData: 'another',
        },
        receivedAt: 1,
      },
    })).toEqual({
      isFetching: false,
      lastUpdated: 1,
      error: undefined,
      data: 'another',
    });
  });
});
