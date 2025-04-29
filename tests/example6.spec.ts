import { test, expect, chromium } from '@playwright/test';
test.describe.parallel('Run same test 10 times in parallel', () => {
  for (let i = 1; i <= 1; i++) {
    test(`Parallel run ${i}`, async ({ page }) => {
  await page.goto('https://www.google.com');

  console.log('Filling search input...');
  const searchInput = page.locator('*[name="q"]');
  await searchInput.fill('SenthilSmartQaHub');
  console.log('Submitting search...');
  await searchInput.press('Enter');

  console.log('Waiting for search results...');
  await page.waitForLoadState('domcontentloaded')

  console.log('Checking for "Not now" prompt...');
  const location = await page.locator("//*[text()='Not now']").first().isVisible();

  if (location) {
    console.log('"Not now" prompt found. Clicking it...');
    await page.locator("//*[text()='Not now']").first().click();
  } else {
    console.log('"Not now" prompt not visible.');
  }

  console.log('Looking for expected link...');
  const expectedLink = page.locator("//*[text()='https://playwrightautomationtesting.blogspot.com']");
  await expectedLink.first().click();

  console.log('Waiting for blog page to load...');
  await page.waitForLoadState('domcontentloaded')

  console.log('Clicking "Course Topics"...');
  await page.locator("//*[text()='Course Topics']").first().click();

  console.log('Verifying title is visible...');
  const title = page.locator("//*[@class='post-title entry-title']");
  await expect(title).toBeVisible();

  console.log('Test completed successfully.');

});
}
});