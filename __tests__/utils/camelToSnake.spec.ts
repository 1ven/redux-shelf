import { camelToSnake } from '../../src/utils';

describe('camelToSnake', () => {
  it('should convert camecase string to snakecase string', () => {
    expect(
      camelToSnake('helloWorld')
    ).toBe('hello_world');
  });
});
