"use strict";

var axios = require('axios');
/* import { ICallApi } from '../interfaces'; */
var callApi = function callApi(url, method, data) {
    return axios({ url: url, method: method, data: data }).then(function (_ref) {
        var data = _ref.data;
        return {
            result: data,
            receivedAt: Date.now()
        };
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = callApi;