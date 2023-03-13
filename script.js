import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
import addDimension from "./helpers/addDimension.js";
import addMetric from "./helpers/addMetric.js";
import signin from "./helpers/signin.js";
dotenv.config();

(async () => {
  puppeteerExtra.use(stealthPlugin());

  const browser = await puppeteerExtra.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await signin(page);
  await page.goto(process.env.importFromUrl);
  await page.waitForSelector(".cdk-column-nameDimension");

  const dimensionNames = [];
  const parameterNames = [];

  const testArray = await page.$$(".cdk-column-nameDimension");

  for (const elem of testArray) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    dimensionNames.push(elemText);
  }
  console.log(dimensionNames);

  const testArray2 = await page.$$(
    ".mat-cell.cdk-cell.cell.cdk-column-developerNameDimension.mat-column-developerNameDimension.ng-star-inserted.basic-table-column-developerNameDimension"
  );
  for (const elem of testArray2) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    parameterNames.push(elemText);
  }
  console.log(parameterNames);

  // ---- export ----
  await page.goto(process.env.exportToUrl);
  await page.waitForTimeout(5000);

  for (let i = 0; i < parameterNames.length; i++) {
    const dimName = dimensionNames[i + 1];
    const parName = parameterNames[i];
    await addDimension(page, dimName, parName);
    console.log(dimName, parName);
  }

  // let value = await element.evaluate((el) => el.textContent);
  // console.log(value);

  // ---- get definitions from page2
  // await addDimension(page);
  // await addMetric(page);
  // await page.waitForTimeout(55000);

  // await browser.close();
})();
