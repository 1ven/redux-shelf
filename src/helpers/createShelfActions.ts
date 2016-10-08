import { IActionType, IActionPayload } from '../interfaces';
import assign from '../utils/assign';

function createShelfActions([request, success, failure]: IActionType[]) {
  return {
    request(payload?: IActionPayload) {
      return {
        type: request,
        payload,
      };
    },
    success(payload?: IActionPayload) {
      return {
        type: success,
        payload,
      };
    },
    failure(payload?: IActionPayload = {}) {
      return {
        type: failure,
        payload: assign(payload, {
          message: payload.message || 'Something bad happened',
        }),
      };
    },
  };
}

export default createShelfActions;
