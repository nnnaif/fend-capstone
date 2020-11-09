import { getDestImage } from '../src/client/js/app';

describe('Testing getDestImage()', () => {
  test('getDestImage() is defined', () => {
    expect(getDestImage).toBeDefined();
  });
  test('getDestImage(destination) should throw if destination is not provided', () => {
    expect(() => getDestImage()).toThrow();
  });
});
