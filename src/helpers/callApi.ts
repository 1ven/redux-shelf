import * as axios from 'axios';
import { normalize } from 'normalizr';

import { IAnyObject, IRequestMethod, IRequestURL } from '../interfaces';

function callApi(
  url: IRequestURL,
  method: IRequestMethod,
  schema?: Normalizr.SchemaType,
  data?: IAnyObject
): Promise<IApiData> {
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

interface IApiData {
  normalized?: {
    result: (string | number)[],
    entities: IAnyObject,
  },
  result?: IServerResponse,
  receivedAt: number,
}

type IServerResponse = any;

export default callApi;
