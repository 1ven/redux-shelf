import * as axios from 'axios';
import * as isEmpty from 'lodash/isEmpty';
import replaceParams from '../utils/replaceParams';

/* import { ICallApi } from '../interfaces'; */

const createCallApiHandler = function(urlPattern, method) {
  return ({ requestBody = {}, requestParams = {} } = {}) => {
    const url = isEmpty(requestParams) ? urlPattern : replaceParams(urlPattern, requestParams);

    return axios({ url, method, data: requestBody })
      .then(({ data }) => ({
        result: data,
        receivedAt: Date.now(),
      }));
  };
}

/* type IServerResponse = any; */

export default createCallApiHandler;
