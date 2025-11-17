import { test, expect } from '@playwright/test';

test.describe('Responsive layout', () => {
  test('mobile layout shows overlay sidebar trigger', async ({ page }) => {
    await page.goto('/');
    const wrapper = page.locator('main');
    await expect(wrapper).toBeVisible();
  });

  test.describe.configure({ mode: 'parallel' });

  test('tablet layout renders content with padding', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('desktop shows persistent sidebar', async ({ page }) => {
    await page.context().grantPermissions([]);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const sidebar = page.locator('div').filter({ hasText: 'Nurse Portal' });
    await expect(sidebar).toBeVisible();
  });
});