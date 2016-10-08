import * as deepFreeze from 'deep-freeze';
import assign from '../../src/utils/assign';

describe('assign', () => {
  it('should merge two objects and return new object', () => {
    expect(assign({
      a: '1',
    }, {
      b: '2',
    })).toEqual({
      a: '1',
      b: '2',
    });
  });

  it('should not mutate arguments objects', () => {
    const a = { a: '1' };
    const b = { b: '2' };

    deepFreeze(a);
    deepFreeze(b);

    assign(a, b);
  });
});
