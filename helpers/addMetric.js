export default async function addMetric(page, metName, metPar, metUnit) {
  await page.waitForTimeout(1000);

  await page.click('[guidedhelpid="create-custom-dimension"]');
  const input1 = '[aria-labelledby="custom-name-input-label"]';
  const input2 = '[aria-labelledby="parameter-name-input-label"]';

  await page.waitForSelector(input1, { visible: true });
  await page.waitForTimeout(1000);

  await page.type(input1, metName);
  await page.waitForTimeout(1000);

  await page.type(input2, metPar);
  await page.waitForTimeout(1000);

  await page.select(".unit-input-label", "Standard");
  await page.waitForSelector(1000);

  await page.click(".definition-builder-button");
  await page.waitForTimeout(1000);
}
