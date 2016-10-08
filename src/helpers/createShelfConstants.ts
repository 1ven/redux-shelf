import camelToSnake from './utils';

/* const createObject = types => types.reduce((acc, type) => ({ */
/*   ...acc, [type]: type */
/* }), {}); */

function createShelfConstants(name) {
  const n = camelToSnake(name).toUpperCase();
  return [
    `${n}_REQUEST`,
    `${n}_SUCCESS`,
    `${n}_FAILURE`,
  ];
};

export default createShelfConstants;

/* export default const createShelfConstants = name => ( */
/*   createObject( */
/*     createTypesArray(name) */
/*   ) */
/* ); */
