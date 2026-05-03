import * as util from './myGetMonth.js';

describe('getMonth function', () => {

  test('returns 0 for January', () => {
    const date = new Date('1982-01-18');
    expect(util.getMonth(date)).toBe(0);
  });

  test('returns 5 for June', () => {
    const date = new Date('2011-06-17');
    expect(util.getMonth(date)).toBe(5);
  });

  test('Returns 11 for December', () => {
    const date = new Date('2025-12-31');
    expect(util.getMonth(date)).toBe(11);
  });

  test('Can work with current date', () => {
    const date = new Date();
    expect(util.getMonth(date)).toBe(date.getMonth());
  });

  test('falls if value isnt a date', () => {
    expect(() => util.getMonth("2024-01-01")).toThrow();
  });

});