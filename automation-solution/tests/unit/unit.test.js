import {
  getMostExpensive,
  getTotalPrice,
  filterByPrice,
  hasProduct,
  sortByPriceDesc,
} from "../../business/cameraUtils.js";

const products = [
  { name: "Camera A", price: 500 },
  { name: "Camera B", price: 1200 },
  { name: "Camera C", price: 800 },
];

describe("Camera utils unit tests", () => {
  test("Should return most expensive product", () => {
    const result = getMostExpensive(products);
    expect(result.name).toBe("Camera B");
  });

  test("Should calculate total price", () => {
    const result = getTotalPrice(products);
    expect(result).toBe(2500);
  });

  test("Should filter products by minimum price", () => {
    const result = filterByPrice(products, 700);
    expect(result.length).toBe(2);
  });

  test("Should check if product exists", () => {
    const result = hasProduct(products, "Camera A");
    expect(result).toBe(true);
  });

  test("Should sort products by price descending", () => {
    const result = sortByPriceDesc(products);
    expect(result[0].price).toBe(1200);
  });
});
