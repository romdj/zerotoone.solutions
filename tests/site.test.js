// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Zero to One Solutions Website', () => {
  test('homepage loads with correct styling and content', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check page title and main heading
    await expect(page).toHaveTitle(/Zero to One Solutions/);
    await expect(page.locator('h1')).toContainText("Simplicity at Scale");

    // Check tagline
    await expect(page.locator('text=Complex challenges deserve elegant solutions.')).toBeVisible();

    // Check brand in navigation - now shows "01"
    await expect(page.locator('.brand')).toBeVisible();

    // Check navigation items (Option 4 structure)
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 769) {
      // Desktop menu visible on larger screens
      await expect(page.locator('.desktop-menu a[href="/portfolio"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/services"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/studio"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/insights"]')).toBeVisible();
      await expect(page.locator('.desktop-menu a[href="/contact"]')).toContainText("Let's Build");
    } else {
      // Mobile menu elements should be present on smaller screens
      await expect(page.locator('.hamburger')).toBeVisible();
      await expect(page.locator('.desktop-menu')).toBeHidden();
    }
  });

  test('services page loads with new structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/services`);
    
    await expect(page.locator('h1')).toContainText('Services');
    await expect(page.locator('text=Enterprise solutions that scale')).toBeVisible();
    await expect(page.locator('text=Coming Soon')).toBeVisible();
  });

  test('contact page loads with new structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    
    await expect(page.locator('h1')).toContainText('Get in Touch');
    await expect(page.locator('text=Let\'s discuss your next breakthrough')).toBeVisible();
    await expect(page.locator('text=Contact form coming soon')).toBeVisible();
  });

  test('about page shows new structure', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    
    await expect(page.locator('h1')).toContainText('About');
    await expect(page.locator('text=Transforming complexity into clarity')).toBeVisible();
    await expect(page.locator('text=Full story coming soon')).toBeVisible();
  });

  test('navigation works across all pages', async ({ page }) => {
    // Test direct navigation to each page
    await page.goto(`${BASE_URL}/services`);
    await expect(page).toHaveURL(`${BASE_URL}/services`);
    
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
    await expect(page.locator('.wrap')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();

    // Check wireframe reference (temporary during redesign)
    await expect(page.locator('h2')).toContainText('Wireframe Reference');
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check that content is still visible and accessible
    await expect(page.locator('h1')).toContainText("Simplicity at Scale");
    await expect(page.locator('.brand')).toBeVisible();
    
    // Check hero content is responsive
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('a.cta')).toBeVisible();
  });
});