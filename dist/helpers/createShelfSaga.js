"use strict";

var assign_1 = require('../utils/assign');
var redux_saga_1 = require('redux-saga');
var effects_1 = require('redux-saga/effects');
/* import { IAsyncActions, IAction, ICallApiWrapper } from '../interfaces'; */
var createShelfSaga = function createShelfSaga(_ref, callApiWrapper) {
    var request = _ref.request;
    var success = _ref.success;
    var failure = _ref.failure;

    return {
        task: regeneratorRuntime.mark(function task(requestAction) {
            var responsePayload;
            return regeneratorRuntime.wrap(function task$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return effects_1.call(callApiWrapper, requestAction.payload);

                        case 3:
                            responsePayload = _context.sent;
                            _context.next = 6;
                            return effects_1.put(success(assign_1.default(responsePayload, {
                                requestPayload: requestAction.payload
                            })));

                        case 6:
                            _context.next = 12;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);
                            _context.next = 12;
                            return effects_1.put(failure({
                                message: _context.t0.message
                            }));

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, task, this, [[0, 8]]);
        }),
        watcher: regeneratorRuntime.mark(function watcher() {
            return regeneratorRuntime.wrap(function watcher$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.delegateYield(redux_saga_1.takeEvery(request().type, this.task), 't0', 1);

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watcher, this);
        })
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createShelfSaga;