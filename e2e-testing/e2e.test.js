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

  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);

  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });

  return page;
};

describe("Demo Web Shop E2E tests", () => {
  test("Search product and add to cart", async () => {
    const page = await newPage();
    await page.type("#small-searchterms", "book");
    await page.click('input[value="Search"]');
    await page.waitForSelector(".product-item");
    await page.click(".product-title a");

    await page.waitForSelector(".add-to-cart-button");
    await page.click(".add-to-cart-button");
    await page.waitForSelector(".bar-notification.success");
    await page.click(".cart-label");
    await page.waitForSelector(".cart");
    const qty = await page.$eval(".cart-qty", (el) => el.textContent);
    expect(qty).toContain("1");

    await page.close();
  });

  test("Register user and use Email a Friend feature", async () => {
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

    const regResult = await page.$eval(".result", (el) =>
      el.textContent.trim(),
    );
    expect(regResult).toContain("Your registration completed");

    await page.goto(BASE_URL, {
      waitUntil: "networkidle2",
    });

    await page.type("#small-searchterms", "computer");
    await page.click('input[value="Search"]');

    await page.waitForSelector(".product-title a");
    await page.click(".product-title a");

    await page.waitForSelector(".email-a-friend");
    await page.click(".email-a-friend");
    await page.waitForSelector("#FriendEmail");
    await page.type("#FriendEmail", "friend@test.com");
    await page.type("#PersonalMessage", "Check this product!");
    await page.click('input[value="Send email"]');

    await page.waitForSelector(".result", {
      timeout: 60000,
    });

    const resultText = await page.$eval(".result", (el) => el.textContent);

    expect(resultText).toMatch(/successfully|registered|sent/i);

    await page.close();
  });

  test("Open category and verify product list", async () => {
    const page = await newPage();

    await page.goto(`${BASE_URL}/books`, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".product-item");
    const products = await page.$$(".product-item");
    expect(products.length).toBeGreaterThan(0);
    await page.click(".product-title a");
    await page.waitForSelector("h1");
    const title = await page.$eval("h1", (el) => el.textContent);
    expect(title.length).toBeGreaterThan(0);

    await page.close();
  });
});
