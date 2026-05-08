import axios from "axios";

const BASE_URL = "https://demowebshop.tricentis.com";

describe("Demo Web Shop API tests", () => {

  test("GET home page should return 200", async () => {
    const res = await axios.get(BASE_URL);
    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("GET books category should return products", async () => {
    const res = await axios.get(`${BASE_URL}/books`);
    expect(res.status).toBe(200);
    expect(res.data).toContain("product-item");
  });

  test("GET camera category page should load products", async () => {
    const res = await axios.get(`${BASE_URL}/camera-photo`);
    expect(res.status).toBe(200);
    expect(res.data).toContain("product-item");
  });

  test("Search API should return results for camera", async () => {
    const res = await axios.get(
      `${BASE_URL}/search?q=camera`
    );
    expect(res.status).toBe(200);
    expect(res.data.toLowerCase()).toContain("product");
  });

  test("Product page should be accessible", async () => {
    const res = await axios.get(
      `${BASE_URL}/smartphone`
    );
    expect(res.status).toBe(200);
    expect(res.data).toContain("Add to cart");
  });

});