import * as axios from 'axios';
import * as isEmpty from 'lodash/isEmpty';
import * as assign from 'lodash/assign';

import { assign as spread, replaceParams } from '../utils';

/* import { ICallApi } from '../interfaces'; */

const createCallApiHandler = function(urlPattern, method, buildGenericHeaders?, buildGenericParams?, requestConfig?) {
  return ({ requestBody = {}, requestParams = {} } = {}) => {
    const genericParams = buildGenericParams && buildGenericParams();
    const genericHeaders = buildGenericHeaders && buildGenericHeaders();

    const mergedParams = assign({}, genericParams, requestParams);
    const url = isEmpty(mergedParams) ? urlPattern : replaceParams(urlPattern, mergedParams);

    return axios({
      url,
      method,
      headers: genericHeaders,
      data: requestBody,
      withCredentials: requestConfig && requestConfig.withCredentials,
    }).then((response) => response.data);
  };
}

const buildHeaders = function(headersList) {
  return headersList.reduce((acc, headers) => spread(
    acc,
    typeof headers === 'function' ? headers() : headers,
  ), {});
}

/* type IServerResponse = any; */

export default createCallApiHandler;
