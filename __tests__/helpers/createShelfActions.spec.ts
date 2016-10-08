import createShelfActions from '../../src/helpers/createShelfActions';

const actions = createShelfActions(['TODOS_REQUEST', 'TODOS_SUCCESS', 'TODOS_FAILURE']);

describe('createShelfActions', () => {
  it('should create async actions creators object which contains `request` action creator', () => {
    const payload = {
      title: 'test title',
    };

    expect(actions.request(payload)).toEqual({
      type: 'TODOS_REQUEST',
      payload,
    });
  });

  it('should create async actions creators object which contains `success` action creator', () => {
    const payload = {
      title: 'test title',
    };

    expect(actions.success(payload)).toEqual({
      type: 'TODOS_SUCCESS',
      payload,
    });
  });

  it('should create async actions creators object which contains `failure` action creator', () => {
    const payload = {
      message: 'test message',
    };

    expect(actions.failure(payload)).toEqual({
      type: 'TODOS_FAILURE',
      payload,
    });
  });

  it('should create async actions creators object which contains `failure` action creator with default error message if no one is provided in payload', () => {
    const payload = {
      value: 'some value',
    };

    expect(actions.failure(payload)).toEqual({
      type: 'TODOS_FAILURE',
      payload: {
        value: 'some value',
        message: 'Something bad happened',
      },
    });
  });

  it('should create async actions creators object which contains `failure` actions creator with default error message if payload is not provided', () => {
    expect(actions.failure()).toEqual({
      type: 'TODOS_FAILURE',
      payload: {
        message: 'Something bad happened',
      },
    });
  });
});
