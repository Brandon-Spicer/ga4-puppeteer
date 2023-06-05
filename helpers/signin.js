export default async function signin(page) {
  await page.goto("https://accounts.google.com/signin/v2/identifier");
  await page.type('[type="email"]', process.env.gmailUsername);
  await page.click("#identifierNext");

  //   await page.waitForSelector('[type="password"]', {
  //     visible: true,
  //     timeout: 0,
  //   });
  await page.waitForTimeout(6000);
  await page.type('[type="password"]', process.env.password);

  await page.waitForSelector("#passwordNext");
  await page.click("#passwordNext");
  await page.waitForNavigation();
}
