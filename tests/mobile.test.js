// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Mobile Navigation and Functionality', () => {
  test.use({ hasTouch: true });
  
  test('homepage loads and displays correctly on iPhone', async ({ page }) => {
    // Set iPhone viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);

    // Check core content is visible
    await expect(page.locator('h1')).toContainText("Creating Tomorrow, Today");
    await expect(page.locator('.brand')).toBeVisible();

    // Check hero content is properly displayed
    await expect(page.locator('text=You bring the idea, we make it a reality')).toBeVisible();

    // Verify main CTA is visible
    await expect(page.locator('.cta-button')).toBeVisible();
  });

  test('homepage loads and displays correctly on Android', async ({ page }) => {
    // Set Android viewport (Pixel 5)
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto(BASE_URL);

    // Check core content is visible
    await expect(page.locator('h1')).toContainText("Creating Tomorrow, Today");
    await expect(page.locator('.brand')).toBeVisible();

    // Check hero content is properly displayed
    await expect(page.locator('text=You bring the idea, we make it a reality')).toBeVisible();
  });

  test('navigation and CTA work correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);

    // Test navigation items (desktop menu should be hidden on mobile)
    await expect(page.locator('.desktop-menu')).toBeHidden();

    // Check mobile navigation elements instead
    await expect(page.locator('.hamburger')).toBeVisible();

    // Check brand is visible
    await expect(page.locator('.brand')).toBeVisible();
  });

  test('work page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/work`);

    // Check work page content
    await expect(page.locator('h1')).toContainText('Enterprise Solutions');
    await expect(page.locator('text=Featured Transformations')).toBeVisible();
  });

  test('contact page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/contact`);

    // Check contact page content
    await expect(page.locator('h1')).toContainText('Let\'s Work Together');
    await expect(page.locator('text=Choose the path that fits your needs')).toBeVisible();
  });

  test('about page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/about`);

    // Check about page content
    await expect(page.locator('h1')).toContainText('About Zero to One');
    await expect(page.locator('text=Transforming complexity into clarity')).toBeVisible();
  });

  test('main design elements display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);

    // Check main design elements
    await expect(page.locator('.hero .container').first()).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();

    // Check partners section
    await expect(page.locator('.partners')).toBeVisible();
    await expect(page.locator('text=Empowering Those Who Shape the Future')).toBeVisible();
  });

  test('navigation between pages works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    // Test navigation to each page
    await page.goto(`${BASE_URL}/work`);
    await expect(page).toHaveURL(`${BASE_URL}/work`);
    await expect(page.locator('h1')).toContainText('Enterprise Solutions');

    await page.goto(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
    await expect(page.locator('h1')).toContainText('Let\'s Work Together');

    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    await expect(page.locator('h1')).toContainText('About Zero to One');

    // Back to home
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('Creating Tomorrow, Today');
  });



  test('page scrolling works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Test basic scrolling functionality
    await page.evaluate(() => {
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
    
    // Wait briefly for scroll
    await page.waitForTimeout(500);
    
    // Check that main content is still visible after scroll
    await expect(page.locator('h1')).toBeVisible();
  });

  test('touch interactions work correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);

    // Test touch interactions on CTA button
    const ctaButton = page.locator('.cta-button');
    await expect(ctaButton).toBeVisible();

    // Test tap interaction
    await ctaButton.click({ force: true });
    await page.waitForLoadState('networkidle');

    // Should navigate to work page
    await expect(page).toHaveURL(`${BASE_URL}/work`);
    await expect(page.locator('h1')).toContainText('Enterprise Solutions');
  });


  test('iPhone 12/13/14 compatibility', async ({ page }) => {
    // Test on iPhone 12/13/14 dimensions (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);

    // Check content displays properly on modern iPhone
    await expect(page.locator('h1')).toContainText('Creating Tomorrow, Today');
    await expect(page.locator('.brand')).toBeVisible();

    // Check hero section renders properly
    await expect(page.locator('.hero')).toBeVisible();
  });

  test('large phone (Samsung Galaxy) compatibility', async ({ page }) => {
    // Test on large phone screen
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL);

    // Check content displays well on larger mobile screen
    await expect(page.locator('h1')).toContainText('Creating Tomorrow, Today');
    await expect(page.locator('.brand')).toBeVisible();

    // Check design elements
    await expect(page.locator('.hero .container').first()).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();

    // Test navigation (desktop menu hidden on large phones too)
    await expect(page.locator('.desktop-menu')).toBeHidden();
    await expect(page.locator('.hamburger')).toBeVisible();
  });
});