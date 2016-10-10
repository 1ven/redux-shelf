import assign from '../utils/assign';

import { IAsyncActions, IAction, ICallApiWrapper } from '../interfaces';

function createShelfSaga(
  { request, success, failure }: IAsyncActions,
  callApiWrapper: ICallApiWrapper
) {
  return {
    task: function* (requestAction: IAction) {
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
      yield* takeEvery(request.type, this.task);
    },
  };
}

export default createShelfSaga;
