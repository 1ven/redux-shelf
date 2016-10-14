import assign from '../utils/assign';
import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

/* import { IAsyncActions, IAction, ICallApiWrapper } from '../interfaces'; */

const createShelfSaga = function(
  { request, success, failure },
  callApiWrapper,
  schema
) {
  return {
    task: function* (requestAction): any {
      try {
        const responseData = yield call(callApiWrapper, requestAction.payload);

        const responsePayload = !schema ? responseData : assign(normalize(responseData, schema), {
          receivedAt: responseData.receivedAt,
        });

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
