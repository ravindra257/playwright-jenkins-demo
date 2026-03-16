import { test, expect } from '@playwright/test';

test.skip('get started link', async ({ page, browser }) => {
    const url  = process.env.GOOGLE_URL;
  await page.goto(process.env.GOOGLE_URL);

  await page.locator("#APjFqb").click;
  await page.locator("#APjFqb").fill("playwright tutorial");
  await page.locator("#APjFqb").press('Enter');
  
  console.log("username is "+ process.env.USER_NAME);
  console.log("password is "+ process.env.PASSWORD);

  await page.close();
//   await browser.close();

});