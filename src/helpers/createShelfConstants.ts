import { camelToSnake } from '../utils';

/* import { IApiName, IAsyncActionTypes } from '../interfaces'; */

const createShelfConstants = function(name, namespace?) {
  const ns = namespace ? namespace.toUpperCase() + '_' : '';
  const n = ns + camelToSnake(name).toUpperCase();
  return [
    `${n}_REQUEST`,
    `${n}_SUCCESS`,
    `${n}_FAILURE`,
  ];
};

export default createShelfConstants;
