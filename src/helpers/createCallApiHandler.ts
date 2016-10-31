import * as axios from 'axios';
import * as isEmpty from 'lodash/isEmpty';
import { assign as spread, replaceParams } from '../utils';

/* import { ICallApi } from '../interfaces'; */

const createCallApiHandler = function(
  urlPattern,
  method,
  defaults
) {
  return ({ requestBody = {}, requestParams = {} } = {}) => {
    const { headers, params, body } = defaults;

    const initialHeaders = headers && handleDefaultsItem(headers);
    const initialParams = params && handleDefaultsItem(params);
    const initialBody = body && handleDefaultsItem(body);

    const url = makeUrl(urlPattern, initialParams, requestParams);
    const data = spread(initialBody, requestBody);

    return axios({
      url,
      method,
      data,
      headers: initialHeaders,
    })
      .then(({ data }) => ({
        result: data,
        receivedAt: Date.now(),
      }));
  };
}

const makeUrl = function(pattern, ...paramsList) {
  const params = paramsList.reduce((acc, param) => spread(acc, param), {});
  return isEmpty(params) ? pattern : replaceParams(pattern, params);
}

const handleDefaultsItem = function(item) {
  return typeof item === 'function' ? item() : item;
}

/* type IServerResponse = any; */

export default createCallApiHandler;
