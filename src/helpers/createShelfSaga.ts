function createShelfSaga([ request, success, failure ], apiFunc) {
  return {
    task: function* (requestAction) {
      try {
        const responsePayload = yield call(apiFunc, requestAction.payload);
        yield put(success({
          ...responsePayload,
          request: requestAction,
        }));
      } catch(err) {
        yield put(failure(err.message));
      }
    },
    watcher: function* () {
      yield* takeEvery(request.type, this.task);
    },
  };
}

export default function createShelfSaga;
