export default const createReducer = (initialState, map) => (
  function(state = initialState, action = {}) {
    for (let [key, value] of map) {
      if (key === action.type) {
        return value(state, action.payload);
      }
    }

    return state;
  };
);

/* const reducer = createReducer({
  isFetching: false,
}, { */
/*   'FETCH_REQUEST': (state, payload) => ({ */
/*     ...state, */
/*     isFetching: true, */
/*   }); */
/* }); */
