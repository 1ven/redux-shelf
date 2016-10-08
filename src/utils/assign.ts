import { IAnyObject } from '../interfaces';

function assign(a: IAnyObject, b: IAnyObject) {
  return Object.assign({}, a, b);
}

export default assign;
