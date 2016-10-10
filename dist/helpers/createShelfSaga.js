"use strict";
const assign_1 = require('../utils/assign');
const redux_saga_1 = require('redux-saga');
const effects_1 = require('redux-saga/effects');
/* import { IAsyncActions, IAction, ICallApiWrapper } from '../interfaces'; */
const createShelfSaga = function ({ request, success, failure }, callApiWrapper) {
    return {
        task: function* (requestAction) {
            try {
                const responsePayload = yield effects_1.call(callApiWrapper, requestAction.payload);
                yield effects_1.put(success(assign_1.default(responsePayload, {
                    requestPayload: requestAction.payload,
                })));
            }
            catch (err) {
                yield effects_1.put(failure({
                    message: err.message,
                }));
            }
        },
        watcher: function* () {
            yield* redux_saga_1.takeEvery(request().type, this.task);
        },
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfSaga;
