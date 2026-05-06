import puppeteer from "puppeteer";

jest.setTimeout(40000);

let browser;
let page;

const BASE_URL = "https://demowebshop.tricentis.com/jewelry";

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });
});

test("Page loads successfully", async () => {
  const title = await page.title();
  expect(title.toLowerCase()).toContain("jewelry");
});

test("Products are visible", async () => {
  await page.waitForSelector(".product-item");

  const items = await page.$$(".product-item");
  expect(items.length).toBeGreaterThan(0);
});

test("Open product details", async () => {
  await page.waitForSelector(".product-item a");

  await page.click(".product-item a");

  await page.waitForSelector("h1");

  const title = await page.$eval("h1", (el) => el.textContent);

  expect(title.length).toBeGreaterThan(0);
});

test("Add product to cart", async () => {
  await page.waitForSelector(".product-item a");

  await page.click(".product-item a");

  await page.waitForSelector("input[value='Add to cart']");

  await page.click("input[value='Add to cart']");

  await page.waitForSelector(".bar-notification");

  const notification = await page.$(".bar-notification");
  expect(notification).not.toBeNull();
});

test("Open cart page", async () => {
  await page.goto("https://demowebshop.tricentis.com/cart");

  const url = page.url();

  expect(url).toContain("cart");
});

test("Check UI elements exist", async () => {
  const search = await page.$("#small-searchterms");
  const menu = await page.$(".header-menu");

  expect(search).not.toBeNull();
  expect(menu).not.toBeNull();
});
