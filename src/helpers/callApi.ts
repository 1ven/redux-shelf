import * as axios from 'axios';

/* import { ICallApi } from '../interfaces'; */

const callApi = function(url, method, data) {
  const _url = typeof url === 'function' ? url() : url;

  return axios({ url: _url, method, data })
    .then(({ data }) => ({
      result: data,
      receivedAt: Date.now(),
    });
}

/* type IServerResponse = any; */

export default callApi;
