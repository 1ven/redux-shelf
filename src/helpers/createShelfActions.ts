export default const createShelfActions = ([request, success, failure]) => ({
  request(payload) {
    return {
      type: request,
      payload,
    };
  },
  success(payload) {
    return {
      type: success,
      payload,
    };
  },
  failure(payload) {
    return {
      type: failure,
      payload: {
        ...payload,
        message: payload.message || 'Something bad happened',
      },
    };
  },
});
