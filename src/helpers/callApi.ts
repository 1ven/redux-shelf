import * as axios from 'axios';
import { normalize } from 'normalizr';

export default function callApi(url, method, schema, data) {
  return axios({
    url: typeof url === 'function' ? url() : url,
    method,
    data,
  }).then(body => {
    const receivedAt = Date.now();
    return schema ? {
      ...normalize(body, schema),
      receivedAt,
    } : {
      result: body,
      receivedAt,
    };
  });
}
