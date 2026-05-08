const { test, expect } = require("@playwright/test");

const BASE_URL = "https://demowebshop.tricentis.com";

test("Search product", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill("#small-searchterms", "book");
  await page.click('input[value="Search"]');
  await page.waitForSelector(".product-item");
  const products = await page.locator(".product-item");
  const count = await products.count();
  expect(count).toBeGreaterThan(0);
});

test("Register user", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click(".ico-register");
  const email = `test${Date.now()}@mail.com`;
  await page.click("#gender-female");
  await page.fill("#FirstName", "Test");
  await page.fill("#LastName", "User");
  await page.fill("#Email", email);
  await page.fill("#Password", "Test123!");
  await page.fill("#ConfirmPassword", "Test123!");
  await page.click("#register-button");
  await expect(page.locator(".result")).toContainText(
    "Your registration completed",
  );
});

test("Add product to cart", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill("#small-searchterms", "computer");
  await page.click('input[value="Search"]');
  await page.click(".product-title a");
  await page.click(".add-to-cart-button");
  await expect(page.locator(".bar-notification.success")).toContainText(
    "The product has been added",
  );
});
