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

  // ---- import dimensions ----

  // get dimension names
  let dimensionNames = [];
  let testArray = await page.$$(".cdk-column-nameDimension");

  for (const elem of testArray) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    dimensionNames.push(elemText);
  }

  // get dimension parameters
  let parameterNames = [];
  let testArray2 = await page.$$(
    ".mat-cell.cdk-cell.cell.cdk-column-developerNameDimension.mat-column-developerNameDimension.ng-star-inserted.basic-table-column-developerNameDimension"
  );
  for (const elem of testArray2) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    parameterNames.push(elemText);
  }

  // ---- import metrics ----

  // Navigate to metrics tab:
  await page.waitForTimeout(2000);
  const [metricsButton] = await page.$x(
    "//div[contains(., ' Custom metrics ')]"
  );
  await page.waitForTimeout(2000);
  await metricsButton.click();
  await page.waitForTimeout(2000);

  // get metric names
  let metricNames = [];
  let nameElements = await page.$$(".cdk-column-nameMetric");
  for (const elem of nameElements) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    metricNames.push(elemText);
  }

  // get metric parameters
  let metricParams = [];
  let paramElements = await page.$$(
    ".mat-cell.cdk-cell.cell.cdk-column-developerNameDimension.mat-column-developerNameDimension.basic-table-column-developerNameDimension.ng-star-inserted"
  );
  for (const elem of paramElements) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    metricParams.push(elemText);
  }

  // get measurement units
  let metricUnits = [];
  let unitElements = await page.$$(".cdk-column-measurementUnit");
  for (const elem of unitElements) {
    const elemText = await elem.evaluate((elem) => elem.innerText);
    metricUnits.push(elemText);
  }

  // ---- export dimensions ----
  await page.goto(process.env.exportToUrl);
  await page.waitForTimeout(5000);

  for (let i = 0; i < parameterNames.length; i++) {
    const dimName = dimensionNames[i + 1];
    const parName = parameterNames[i];
    await addDimension(page, dimName, parName);
    console.log(dimName, parName);
  }

  // ---- export metrics ----

  // Navigate to metrics tab:
  await page.waitForTimeout(1000);
  const [metricsButton2] = await page.$x(
    "//div[contains(., ' Custom metrics ')]"
  );
  await page.waitForTimeout(1000);
  await metricsButton2.click();
  await page.waitForTimeout(1000);

  for (let i = 0; i < metricNames.length; i++) {
    const metName = metricNames[i + 1];
    const metPar = metricParams[i];
    const metUnit = metricUnits[i];
    await addMetric(page, metName, metPar, metUnit);
    console.log(metName, metPar, metUnit);
  }

  // let value = await element.evaluate((el) => el.textContent);
  // console.log(value);

  // ---- get definitions from page2
  // await addDimension(page);
  // await addMetric(page);
  // await page.waitForTimeout(55000);

  // await browser.close();
})();
