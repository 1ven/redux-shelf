const typescript = require('typescript');
const tsconfig = require('./tsconfig.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      return typescript.transpile(src, tsconfig.compilerOptions, path, []);
    }
    return src;
  },
};
