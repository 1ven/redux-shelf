import replaceParams from '../../src/utils/replaceParams';

describe('replaceParams', () => {
  it('should make url by given `pattern` and `params`', () => {
    expect(replaceParams('/:id/:title', {
      id: 1,
      title: 'test',
    })).toBe('/1/test');
  });

  it('should throw an Error if matched param is not exists at `params` object', () => {
    expect(() => replaceParams('/:id/:title', {
      id: 1,
    })).toThrow(
      `Matched param is not presented at given object`
    );
  });
});
