export default async function addMetric(page) {
  await page.goto(process.env.ga4Url);
  await page.waitForSelector("[id=mat-tab-label-1-1]", { visible: true });
  await page.click("#mat-tab-label-1-1");
  await page.click('[guidedhelpid="create-custom-dimension"]');

  await page.waitForSelector("#mat-input-0", { visible: true });
  await page.type("#mat-input-0", "test0");
  await page.type("#mat-input-2", "testini0");
  await page.click(".definition-builder-button");
}
