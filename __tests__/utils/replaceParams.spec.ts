import { replaceParams } from '../../src/utils';

describe('replaceParams', () => {
  it('should make url by given `pattern` and `params`', () => {
    expect(replaceParams('/:id/:title', {
      id: 1,
      title: 'test',
    })).toBe('/1/test');

    expect(replaceParams('http://site.com/:id/:title', {
      id: 1,
      title: 'test',
    })).toBe('http://site.com/1/test');
  });

  it('should match camel case params', () => {
    expect(replaceParams('/value/:camelCase', {
      camelCase: 'some-value',
    })).toBe('/value/some-value');
  });

  it('should ignore extra params', () => {
    expect(replaceParams('/value/:id', {
      id: 1,
      title: 'test',
    })).toBe('/value/1');
  });

  it('should throw an Error if matched param is not exists at `params` object', () => {
    expect(() => replaceParams('/:id/:title', {
      id: 1,
    })).toThrow(
      `Matched param "title" is not presented at given object`
    );
  });
});
