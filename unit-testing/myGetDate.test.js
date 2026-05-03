import * as util from './myGetDate.js';

describe('getDate function', () => {

  test('returns 1 for the first day of month', () => {
    const date = new Date('2024-01-01');
    expect(util.getDate(date)).toBe(1);
  });

  test('returns 15 for middle of month', () => {
    const date = new Date('2024-06-15');
    expect(util.getDate(date)).toBe(15);
  });

  test('returns 31 for end of month', () => {
    const date = new Date('2024-07-31');
    expect(util.getDate(date)).toBe(31);
  });

  test('works with current date', () => {
    const date = new Date();
    expect(util.getDate(date)).toBe(date.getDate());
  });

  test('throws error when input is not a Date', () => {
    expect(() => util.getDate(null)).toThrow();
  });

});