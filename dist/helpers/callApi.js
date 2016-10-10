"use strict";
const axios = require('axios');
const normalizr_1 = require('normalizr');
/* import { ICallApi } from '../interfaces'; */
const callApi = function (url, method, schema, data) {
    const _url = typeof url === 'function' ? url() : url;
    return axios({ url: _url, method, data })
        .then(({ data }) => {
        const receivedAt = Date.now();
        return schema ? {
            normalized: normalizr_1.normalize(data, schema),
            receivedAt,
        } : {
            result: data,
            receivedAt,
        };
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = callApi;
