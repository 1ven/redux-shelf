import assign from '../utils/assign';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

/* import { IAsyncActions, IAction, ICallApiWrapper } from '../interfaces'; */

const createShelfSaga = function(
  { request, success, failure },
  callApiWrapper
) {
  return {
    task: function* (requestAction) {
      try {
        const responsePayload = yield call(callApiWrapper, requestAction.payload);
        yield put(success(assign(responsePayload, {
          requestPayload: requestAction.payload,
        })));
      } catch(err) {
        yield put(failure({
          message: err.message,
        }));
      }
    },
    watcher: function* () {
      yield* takeEvery(request().type, this.task);
    },
  };
}

export default createShelfSaga;
