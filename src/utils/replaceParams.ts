const replaceParams = function(pattern, params) {
  return pattern.replace(/:[a-z]*/g, match => {
    const matchedParam = match.substr(1);
    const value = params[matchedParam];

    if (typeof value === 'undefined') {
      throw new Error(`Matched param is not presented at given object`);
    }

    return value;
  });
}

export default replaceParams;
