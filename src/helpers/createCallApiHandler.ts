import * as axios from 'axios';
import * as isEmpty from 'lodash/isEmpty';
import { assign, replaceParams } from '../utils';

/* import { ICallApi } from '../interfaces'; */

const createCallApiHandler = function(urlPattern, method, headersList?) {
  return ({ requestBody = {}, requestParams = {} } = {}) => {
    const url = isEmpty(requestParams) ? urlPattern : replaceParams(urlPattern, requestParams);
    const headers = headersList && buildHeaders(headersList);

    return axios({
      url,
      method,
      headers,
      data: requestBody,
    })
      .then(({ data }) => ({
        result: data,
        receivedAt: Date.now(),
      }));
  };
}

const buildHeaders = function(headersList) {
  return headersList.reduce((acc, headers) => assign(
    acc,
    typeof headers === 'function' ? headers() : headers,
  ), {});
}

/* type IServerResponse = any; */

export default createCallApiHandler;
