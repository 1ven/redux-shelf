"use strict";

var utils_1 = require('../utils');
var normalizr_1 = require('normalizr');
var redux_saga_1 = require('redux-saga');
var effects_1 = require('redux-saga/effects');
/* import { IAsyncActions, IAction, ICallApiHandler } from '../interfaces'; */
var createShelfSaga = function createShelfSaga(_ref, callApiHandler, schema) {
    var request = _ref.request;
    var success = _ref.success;
    var failure = _ref.failure;

    return {
        task: regeneratorRuntime.mark(function task(_ref2) {
            var payload = _ref2.payload;
            var responseBody, wrappedResponseBody, responsePayload, status;
            return regeneratorRuntime.wrap(function task$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return effects_1.call(callApiHandler, payload);

                        case 3:
                            responseBody = _context.sent;
                            wrappedResponseBody = {
                                result: responseBody,
                                receivedAt: Date.now()
                            };
                            responsePayload = !schema ? wrappedResponseBody : utils_1.assign(normalizr_1.normalize(wrappedResponseBody.result, schema), {
                                receivedAt: wrappedResponseBody.receivedAt
                            });
                            _context.next = 8;
                            return effects_1.put(success(utils_1.assign(responsePayload, {
                                requestPayload: payload
                            })));

                        case 8:
                            _context.next = 16;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context['catch'](0);

                            if (process && process.env && process.env.NODE_ENV === 'development') {
                                console.warn(_context.t0);
                            }
                            status = _context.t0.response && _context.t0.response.status;
                            _context.next = 16;
                            return effects_1.put(failure(utils_1.assign({
                                message: _context.t0.message,
                                status: status
                            }, {
                                requestPayload: payload
                            })));

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, task, this, [[0, 10]]);
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