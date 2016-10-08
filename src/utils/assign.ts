function assign(a: IAnyObject, b: IAnyObject) {
  return Object.assign({}, a, b);
}

interface IAnyObject {
  [key: string]: any,
}

export default assign;
