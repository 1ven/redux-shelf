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
            var wrappedResponseBody, responsePayload;
            return regeneratorRuntime.wrap(function task$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return effects_1.call(callApiHandler, payload);

                        case 3:
                            wrappedResponseBody = _context.sent;
                            responsePayload = !schema ? wrappedResponseBody : utils_1.assign(normalizr_1.normalize(wrappedResponseBody.result, schema), {
                                receivedAt: wrappedResponseBody.receivedAt
                            });
                            _context.next = 7;
                            return effects_1.put(success(utils_1.assign(responsePayload, {
                                requestPayload: payload
                            })));

                        case 7:
                            _context.next = 14;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);

                            if (process && process.env && process.env.NODE_ENV === 'development') {
                                console.warn(_context.t0);
                            }
                            _context.next = 14;
                            return effects_1.put(failure(utils_1.assign({
                                message: _context.t0.message
                            }, {
                                requestPayload: payload
                            })));

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, task, this, [[0, 9]]);
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