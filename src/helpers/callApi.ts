import * as axios from 'axios';
import { normalize } from 'normalizr';

import { ICallApi } from '../interfaces';

const callApi: ICallApi = function(url, method, schema, data) {
  const _url = typeof url === 'function' ? url() : url;

  return axios({ url: _url, method, data })
    .then(({ data }: Axios.AxiosXHR<IServerResponse>) => {
      const receivedAt = Date.now();

      return schema ? {
        normalized: normalize(data, schema),
        receivedAt,
      } : {
        result: data,
        receivedAt,
      };
    });
}

type IServerResponse = any;

export default callApi;
