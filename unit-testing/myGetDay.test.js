import * as util from "./myGetDay.js";

describe("getDay function", () => {
  test("returns 0 for Sunday", () => {
    const date = new Date("2024-06-02");
    expect(util.getDay(date)).toBe(0);
  });

  test("returns correct day across different months (consistency check)", () => {
    const date1 = new Date("2026-05-03"); // Sunday
    const date2 = new Date("2026-05-10"); // Sunday
    expect(util.getDay(date1)).toBe(util.getDay(date2));
  });

  test("handles leap year date correctly (Feb 29, 2024)", () => {
    const date = new Date("2024-02-29"); // Thursday
    expect(util.getDay(date)).toBe(4);
  });

  test("works with current date", () => {
    const date = new Date();
    expect(util.getDay(date)).toBe(date.getDay());
  });

  test("throws error when input is not a Date", () => {
    expect(() => util.getDay(undefined)).toThrow();
  });
});
