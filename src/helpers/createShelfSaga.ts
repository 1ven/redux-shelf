import assign from '../utils/assign';
import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

/* import { IAsyncActions, IAction, ICallApiHandler } from '../interfaces'; */

const createShelfSaga = function(
  { request, success, failure },
  callApiHandler,
  schema
) {
  return {
    task: function* ({ payload }): any {
      try {
        const wrappedResponseBody = yield call(callApiHandler, payload);

        const responsePayload = !schema ? wrappedResponseBody : assign(normalize(wrappedResponseBody, schema), {
          receivedAt: wrappedResponseBody.receivedAt,
        });

        yield put(success(assign(responsePayload, {
          requestPayload: payload,
        })));
      } catch(err) {
        if (process && process.env && process.env.NODE_ENV === 'development') {
          console.warn(err);
        }

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
