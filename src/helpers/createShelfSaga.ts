import { assign } from '../utils';
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
        const responseBody = yield call(callApiHandler, payload);
        const wrappedResponseBody = {
          result: responseBody,
          receivedAt: Date.now(),
        };

        const responsePayload = !schema ? wrappedResponseBody : assign(normalize(wrappedResponseBody.result, schema), {
          receivedAt: wrappedResponseBody.receivedAt,
        });

        yield put(success(assign(responsePayload, {
          requestPayload: payload,
        })));
      } catch(err) {
        if (process && process.env && process.env.NODE_ENV === 'development') {
          console.warn(err);
        }

        const status = err.response && err.response.status;

        yield put(failure(assign({
          message: err.message,
          data: err.response && err.response.data,
          status,
        }, {
          requestPayload: payload,
        })));
      }
    },
    watcher: function* () {
      yield* takeEvery(request().type, this.task);
    },
  };
}

export default createShelfSaga;
