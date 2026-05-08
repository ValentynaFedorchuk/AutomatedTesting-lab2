import puppeteer from "puppeteer";

jest.setTimeout(120000);

let browser;

const BASE_URL = "https://demowebshop.tricentis.com";

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    defaultViewport: null,
  });
});

afterAll(async () => {
  await browser.close();
});

const newPage = async () => {
  const page = await browser.newPage();

  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });

  return page;
};

describe("Puppeteer UI tests", () => {
  test("Search product", async () => {
    const page = await newPage();
    await page.type("#small-searchterms", "book");
    await page.click('input[value="Search"]');
    await page.waitForSelector(".product-item");
    const products = await page.$$(".product-item");
    expect(products.length).toBeGreaterThan(0);
    await page.close();
  });

  test("Register user", async () => {
    const page = await newPage();

    await page.click(".ico-register");
    await page.waitForSelector("#FirstName");

    const email = `test${Date.now()}@mail.com`;

    await page.click("#gender-female");
    await page.type("#FirstName", "Test");
    await page.type("#LastName", "User");
    await page.type("#Email", email);
    await page.type("#Password", "Test123!");
    await page.type("#ConfirmPassword", "Test123!");
    await page.click("#register-button");
    await page.waitForSelector(".result");

    const result = await page.$eval(".result", (el) => el.textContent);

    expect(result).toContain("Your registration completed");
    await page.close();
  });

  test("Add product to cart", async () => {
    const page = await newPage();

    await page.type("#small-searchterms", "computer");
    await page.click('input[value="Search"]');
    await page.waitForSelector(".product-title a");
    await page.click(".product-title a");
    await page.waitForSelector(".add-to-cart-button");
    await page.click(".add-to-cart-button");
    await page.waitForSelector(".bar-notification.success");

    const text = await page.$eval(
      ".bar-notification.success",
      (el) => el.textContent,
    );

    expect(text).toContain("The product has been added");
    await page.close();
  });
});
