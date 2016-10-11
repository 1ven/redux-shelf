const createObject = function(path: string, endpointValue: any = {}) {
  const propSeparator = '.';

  if (path.startsWith(propSeparator)) {
    throw new Error(`Path can't starts with ${propSeparator}`);
  }

  if (path.endsWith(propSeparator)) {
    throw new Error(`Path can't ends with ${propSeparator}`);
  }

  if (!path.includes(propSeparator)) {
    return {
      [path]: endpointValue,
    };
  }

  const firstSeparatorIndex = path.indexOf(propSeparator);
  const head = path.slice(0, firstSeparatorIndex);
  const tail = path.slice(firstSeparatorIndex + 1);

  return {
    [head]: createObject(tail, endpointValue),
  };
}

export default createObject;
