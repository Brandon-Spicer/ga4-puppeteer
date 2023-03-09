const puppeteerExtra = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();

(async () => {
  puppeteerExtra.use(stealthPlugin());

  const browser = await puppeteerExtra.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://accounts.google.com/signin/v2/identifier");
  await page.type('[type="email"]', process.env.gmailUsername);
  await page.click("#identifierNext");
  await page.waitForTimeout(5000);

  await page.type('[type="password"]', process.env.password);

  await page.click("#passwordNext");

  await page.waitForTimeout(3000);

  await page.goto(process.env.ga4Url);

  await page.waitForTimeout(3000);

  await page.click('[guidedhelpid="create-custom-dimension"]');

  await page.waitForTimeout(1000);
  await page.type("#mat-input-0", "test");
  await page.waitForTimeout(1000);
  await page.type("#mat-input-2", "testini");
  await page.waitForTimeout(1000);
  await page.click(".definition-builder-button");
  await page.waitForTimeout(1000);

  await page.waitForTimeout(55000);

  // await browser.close();
})();
