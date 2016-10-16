"use strict";

var axios = require('axios');
var isEmpty = require('lodash/isEmpty');
var utils_1 = require('../utils');
/* import { ICallApi } from '../interfaces'; */
var createCallApiHandler = function createCallApiHandler(urlPattern, method) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref$requestBody = _ref.requestBody;
        var requestBody = _ref$requestBody === undefined ? {} : _ref$requestBody;
        var _ref$requestParams = _ref.requestParams;
        var requestParams = _ref$requestParams === undefined ? {} : _ref$requestParams;

        var url = isEmpty(requestParams) ? urlPattern : utils_1.replaceParams(urlPattern, requestParams);
        return axios({ url: url, method: method, data: requestBody }).then(function (_ref2) {
            var data = _ref2.data;
            return {
                result: data,
                receivedAt: Date.now()
            };
        });
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createCallApiHandler;