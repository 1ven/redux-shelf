"use strict";

var axios = require('axios');
var normalizr_1 = require('normalizr');
/* import { ICallApi } from '../interfaces'; */
var callApi = function callApi(url, method, schema, data) {
    var _url = typeof url === 'function' ? url() : url;
    return axios({ url: _url, method: method, data: data }).then(function (_ref) {
        var data = _ref.data;

        var receivedAt = Date.now();
        return schema ? {
            normalized: normalizr_1.normalize(data, schema),
            receivedAt: receivedAt
        } : {
            result: data,
            receivedAt: receivedAt
        };
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = callApi;