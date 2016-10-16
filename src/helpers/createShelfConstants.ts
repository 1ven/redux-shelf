import { camelToSnake } from '../utils';

/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */

const createShelfConstants = function(name) {
  const n = camelToSnake(name).toUpperCase();
  return [
    `${n}_REQUEST`,
    `${n}_SUCCESS`,
    `${n}_FAILURE`,
  ];
};

export default createShelfConstants;
