import * as axios from 'axios';

/* import { ICallApi } from '../interfaces'; */

const callApi = function(url, method, data) {
  return axios({ url, method, data })
    .then(({ data }) => ({
      result: data,
      receivedAt: Date.now(),
    }));
}

/* type IServerResponse = any; */

export default callApi;
