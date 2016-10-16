import { createObject } from '../../src/utils';

describe('createObject', () => {
  it('should create object by given one level deep path string', () => {
    expect(createObject('a')).toEqual({
      a: {},
    });
  });

  it('should create object by given two level deep path string', () => {
    expect(createObject('a.b')).toEqual({
      a: {
        b: {},
      },
    });
  });

  it('should create object by given three level deep path string', () => {
    expect(createObject('a.b.c')).toEqual({
      a: {
        b: {
          c: {},
        }
      },
    });
  });

  it('should create object by given one level deep path string and endpoint value', () => {
    expect(createObject('a', 5)).toEqual({
      a: 5,
    });
  });

  it('should create object by given two level deep path string and endpoint value', () => {
    expect(createObject('a.b', 3)).toEqual({
      a: {
        b: 3,
      },
    });
  });

  it('should create object by given three level deep path string and endpoint value', () => {
    expect(createObject('a.b.c', 8)).toEqual({
      a: {
        b: {
          c: 8,
        }
      },
    });
  });

  it('should throw an Error if path starts with .', () => {
    expect(() => createObject('.a.b.c')).toThrowError('Path can\'t starts with .');
  })

  it('should throw an Error if path ends with .', () => {
    expect(() => createObject('a.b.c.')).toThrowError('Path can\'t ends with .');
  })
});
