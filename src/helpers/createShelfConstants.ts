import camelToSnake from '../utils/camelToSnake';

import { IApiName, IAsyncActionTypes } from '../interfaces';

function createShelfConstants(name: IApiName): IAsyncActionTypes {
  const n = camelToSnake(name).toUpperCase();
  return [
    `${n}_REQUEST`,
    `${n}_SUCCESS`,
    `${n}_FAILURE`,
  ];
};

export default createShelfConstants;
