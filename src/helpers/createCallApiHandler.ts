import * as axios from 'axios';

/* import { ICallApi } from '../interfaces'; */

const createCallApiHandler = function(templateUrl, method) {
  return ({ requestBody = {}, requestParams = {} } = {}) => {
    const url = templateUrl;

    return axios({ url, method, data: requestBody })
      .then(({ data }) => ({
        result: data,
        receivedAt: Date.now(),
      }));
  };
}

/* type IServerResponse = any; */

export default createCallApiHandler;
