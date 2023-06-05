export default async function addDimension(page, dimName, parName) {
  await page.waitForTimeout(1000);

  await page.click('[guidedhelpid="create-custom-dimension"]');
  const input1 = '[aria-labelledby="custom-name-input-label"]';
  const input2 = '[aria-labelledby="parameter-name-input-label"]';
  await page.waitForSelector(input1, { visible: true });
  await page.waitForTimeout(1000);

  await page.type(input1, dimName);
  await page.waitForTimeout(1000);

  await page.type(input2, parName);
  await page.waitForTimeout(1000);

  await page.click(".definition-builder-button");
  await page.waitForTimeout(1000);
}
