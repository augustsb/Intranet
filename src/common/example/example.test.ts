import { addNumbers } from './example';

describe('addNumbers', () => {
  it('should add two positive numbers correctly', () => {
    const result = addNumbers(2, 3);
    expect(result).toBe(5);
  });
});
