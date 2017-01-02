"use strict";

var axios = require('axios');
var isEmpty = require('lodash/isEmpty');
var assign = require('lodash/assign');
var utils_1 = require('../utils');
/* import { ICallApi } from '../interfaces'; */
var createCallApiHandler = function createCallApiHandler(urlPattern, method, buildGenericHeaders, buildGenericParams, requestConfig) {
    return function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _ref$requestBody = _ref.requestBody;
        var requestBody = _ref$requestBody === undefined ? {} : _ref$requestBody;
        var _ref$requestParams = _ref.requestParams;
        var requestParams = _ref$requestParams === undefined ? {} : _ref$requestParams;

        var genericParams = buildGenericParams && buildGenericParams();
        var genericHeaders = buildGenericHeaders && buildGenericHeaders();
        var mergedParams = assign({}, genericParams, requestParams);
        var url = isEmpty(mergedParams) ? urlPattern : utils_1.replaceParams(urlPattern, mergedParams);
        return axios({
            url: url,
            method: method,
            headers: genericHeaders,
            data: requestBody,
            withCredentials: requestConfig && requestConfig.withCredentials
        }).then(function (response) {
            return response.data;
        });
    };
};
var buildHeaders = function buildHeaders(headersList) {
    return headersList.reduce(function (acc, headers) {
        return utils_1.assign(acc, typeof headers === 'function' ? headers() : headers);
    }, {});
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createCallApiHandler;