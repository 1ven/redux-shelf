"use strict";

var axios = require('axios');
var isEmpty = require('lodash/isEmpty');
var utils_1 = require('../utils');
/* import { ICallApi } from '../interfaces'; */
var createCallApiHandler = function createCallApiHandler(urlPattern, method, defaults) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref$requestBody = _ref.requestBody;
        var requestBody = _ref$requestBody === undefined ? {} : _ref$requestBody;
        var _ref$requestParams = _ref.requestParams;
        var requestParams = _ref$requestParams === undefined ? {} : _ref$requestParams;
        var headers = defaults.headers;
        var params = defaults.params;
        var body = defaults.body;

        var initialHeaders = headers && handleDefaultsItem(headers);
        var initialParams = params && handleDefaultsItem(params);
        var initialBody = body && handleDefaultsItem(body);
        var url = makeUrl(urlPattern, initialParams, requestParams);
        var data = utils_1.assign(initialBody, requestBody);
        return axios({
            url: url,
            method: method,
            data: data,
            headers: initialHeaders
        }).then(function (_ref2) {
            var data = _ref2.data;
            return {
                result: data,
                receivedAt: Date.now()
            };
        });
    };
};
var makeUrl = function makeUrl(pattern) {
    for (var _len = arguments.length, paramsList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        paramsList[_key - 1] = arguments[_key];
    }

    var params = paramsList.reduce(function (acc, param) {
        return utils_1.assign(acc, param);
    }, {});
    return isEmpty(params) ? pattern : utils_1.replaceParams(pattern, params);
};
var handleDefaultsItem = function handleDefaultsItem(item) {
    return typeof item === 'function' ? item() : item;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createCallApiHandler;