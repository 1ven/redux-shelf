import createShelfConstants from '../../src/helpers/createShelfConstants';

describe('createShelfConstants', () => {
  it('should create constants array for async actions', () => {
    expect(createShelfConstants('fetchTodos')).toEqual([
      'FETCH_TODOS_REQUEST',
      'FETCH_TODOS_SUCCESS',
      'FETCH_TODOS_FAILURE',
    ]);
  });
});
