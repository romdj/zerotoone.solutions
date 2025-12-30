// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Zero to One Solutions Website', () => {
  test('homepage loads with correct styling and content', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check page title and main heading
    await expect(page).toHaveTitle(/Zero to One Solutions/);
    await expect(page.locator('h1')).toContainText("Creating Tomorrow, Today");

    // Check tagline
    await expect(page.locator('text=You bring the idea, we make it a reality')).toBeVisible();

    // Check brand in navigation - shows "01"
    await expect(page.locator('.brand')).toBeVisible();

    // Check navigation items (new WORK-focused structure)
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 769) {
      // Desktop menu visible on larger screens
      await expect(page.locator('.desktop-menu a[href="/work"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/in-house"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/about"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/contact"]')).toBeVisible();
    } else {
      // Mobile menu elements should be present on smaller screens
      await expect(page.locator('.hamburger')).toBeVisible();
      await expect(page.locator('.desktop-menu')).toBeHidden();
    }
  });

  test('work page loads with case studies', async ({ page }) => {
    await page.goto(`${BASE_URL}/work`);

    await expect(page.locator('h1')).toContainText('Enterprise Solutions');
    await expect(page.locator('text=Featured Transformations')).toBeVisible();
  });

  test('contact page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);

    await expect(page.locator('h1')).toContainText('Get in Touch');
    await expect(page.locator('text=Contact form coming soon')).toBeVisible();
  });

  test('about page shows professional journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);

    await expect(page.locator('h1')).toContainText('About');
    await expect(page.locator('text=Transforming complexity into clarity')).toBeVisible();
  });

  test('navigation works across all pages', async ({ page }) => {
    // Test direct navigation to each page
    await page.goto(`${BASE_URL}/work`);
    await expect(page).toHaveURL(`${BASE_URL}/work`);

    await page.goto(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);

    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);

    // Test back to home
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
  });

  test('design elements and interactions work', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check main container and layout
    await expect(page.locator('.hero .container').first()).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();

    // Check partners section
    await expect(page.locator('.partners')).toBeVisible();
    await expect(page.locator('text=Empowering Those Who Shape the Future')).toBeVisible();
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Check that content is still visible and accessible
    await expect(page.locator('h1')).toContainText("Creating Tomorrow, Today");
    await expect(page.locator('.brand')).toBeVisible();

    // Check hero content is responsive
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.cta-button')).toBeVisible();
  });
});