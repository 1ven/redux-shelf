function createShelfReducer([request, success, failure], customState, map) {
  return (
    state = {
      ...customState,
      isFetching: false,
      lastUpdated: undefined,
      error: undefined,
    },
    action = {}
  ) => {
    const { payload } = action;

    if (map) {
      for (let [key, value] of map) {
        if (key === action.type) {
          return value(state, payload);
        }
      }
    }

    switch (action.type) {
      case request:
        return {
          ...state,
          isFetching: true,
        };
      case success:
        return {
          ...state,
          isFetching: false,
          lastUpdated: payload.receivedAt,
          error: undefined,
        };
      case failure:
        return {
          ...state,
          isFetching: false,
          error: payload.message,
        };
      default:
        return state;
    }
  }
}

export default createShelfReducer;
