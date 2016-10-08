function createReducer(initialState, map) {
  return (state = initialState, action = {}) => {
    for (let [key, value] of map) {
      if (key === action.type) {
        return value(state, action.payload);
      }
    }

    return state;
  }
}

export default createReducer;

/* const reducer = createReducer({
  isFetching: false,
}, { */
/*   'FETCH_REQUEST': (state, payload) => ({ */
/*     ...state, */
/*     isFetching: true, */
/*   }); */
/* }); */
