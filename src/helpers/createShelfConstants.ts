import { camelToSnake } from '../utils';

/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */

const createShelfConstants = function(name, namespace?) {
  const ns = namespace ? namespace + '_' : '';
  const n = camelToSnake(ns + name).toUpperCase();
  return [
    `${n}_REQUEST`,
    `${n}_SUCCESS`,
    `${n}_FAILURE`,
  ];
};

export default createShelfConstants;
