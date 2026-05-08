import puppeteer from "puppeteer";

jest.setTimeout(120000);

let browser;
let page;

const BASE_URL = "https://demowebshop.tricentis.com/camera-photo";

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    defaultViewport: null,
  });

  page = await browser.newPage();

  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });
});

afterAll(async () => {
  await browser.close();
});

test("Open Camera & Photo page", async () => {
  const title = await page.title();
  expect(title).toContain("Camera");
});

test("Verify camera products exist", async () => {
  await page.waitForSelector(".product-item");
  const products = await page.$$(".product-item");
  expect(products.length).toBeGreaterThan(0);
});

test("Sort products by price descending", async () => {
  await page.select("#products-orderby", "11");
  await page.waitForSelector(".product-item");
  const products = await page.$$(".product-item");
  expect(products.length).toBeGreaterThan(0);
});

test("Open first camera product", async () => {
  await page.click(".product-title a");
  await page.waitForSelector("h1");
  const title = await page.$eval("h1", (el) => el.textContent);

  expect(title.length).toBeGreaterThan(0);
});

test("Open camera product details page", async () => {
  await page.click(".product-title a");
  await page.waitForSelector("h1");
  const title = await page.$eval(
    "h1",
    el => el.textContent
  );
  expect(title.length).toBeGreaterThan(0);
});
