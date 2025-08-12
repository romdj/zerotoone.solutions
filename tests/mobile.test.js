// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Mobile Navigation and Functionality', () => {
  test.use({ hasTouch: true });
  
  test('homepage loads and displays correctly on iPhone', async ({ page }) => {
    // Set iPhone viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Check core content is visible (updated to mature design)
    await expect(page.locator('h1')).toContainText("Simplicity at Scale");
    await expect(page.locator('.brand')).toBeVisible();
    
    // Check hero content is properly displayed
    await expect(page.locator('text=Complex challenges deserve elegant solutions.')).toBeVisible();
    
    // Verify scroll indicator is present
    await expect(page.locator('text=↓').first()).toBeVisible();
  });

  test('homepage loads and displays correctly on Android', async ({ page }) => {
    // Set Android viewport (Pixel 5)
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto(BASE_URL);
    
    // Check core content is visible (updated to mature design)
    await expect(page.locator('h1')).toContainText("Simplicity at Scale");
    await expect(page.locator('.brand')).toBeVisible();
    
    // Check hero content is properly displayed
    await expect(page.locator('text=Complex challenges deserve elegant solutions.')).toBeVisible();
  });

  test('navigation and CTA work correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Test navigation items (should check if navigation is accessible on mobile)
    await expect(page.locator('.desktop-menu a[href="/about"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/services"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/contact"]')).toBeVisible();
    
    // Test main CTA button
    const ctaButton = page.locator('a.cta');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Get in touch');
  });

  test('services page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/services`);
    
    // Check services page content
    await expect(page.locator('h1')).toContainText('Services');
    await expect(page.locator('text=Enterprise solutions that scale')).toBeVisible();
    await expect(page.locator('text=Coming Soon')).toBeVisible();
  });

  test('contact page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/contact`);
    
    // Check contact page content
    await expect(page.locator('h1')).toContainText('Get in Touch');
    await expect(page.locator('text=Let\'s discuss your next breakthrough')).toBeVisible();
    await expect(page.locator('text=Contact form coming soon')).toBeVisible();
  });

  test('about page loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/about`);
    
    // Check about page content
    await expect(page.locator('h1')).toContainText('About');
    await expect(page.locator('text=Transforming complexity into clarity')).toBeVisible();
    await expect(page.locator('text=Full story coming soon')).toBeVisible();
  });

  test('serpentine curve displays correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Check serpentine curve SVG is visible
    await expect(page.locator('.serpentine svg')).toBeVisible();
    
    // Check main design elements
    await expect(page.locator('.wrap')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
  });

  test('navigation between pages works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Test navigation to each page
    await page.goto(`${BASE_URL}/services`);
    await expect(page).toHaveURL(`${BASE_URL}/services`);
    await expect(page.locator('h1')).toContainText('Services');
    
    await page.goto(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
    await expect(page.locator('h1')).toContainText('Get in Touch');
    
    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    await expect(page.locator('h1')).toContainText('About');
    
    // Back to home
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('Simplicity at Scale');
  });



  test('page scrolling performance on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Test smooth scrolling performance
    const startTime = Date.now();
    
    // Scroll through the entire page
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    
    // Wait for scroll to complete
    await page.waitForFunction(() => {
      return Math.abs(window.scrollY + window.innerHeight - document.body.scrollHeight) < 100;
    });
    
    const scrollTime = Date.now() - startTime;
    
    // Scrolling should complete within reasonable time (5 seconds)
    expect(scrollTime).toBeLessThan(5000);
    
    // Check that main content is still visible after scroll
    await expect(page.locator('h1')).toBeVisible();
  });

  test('touch interactions work correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    // Test touch interactions on CTA button
    const ctaButton = page.locator('a.cta');
    await expect(ctaButton).toBeVisible();
    
    // Test tap interaction
    await ctaButton.click({ force: true });
    await page.waitForLoadState('networkidle');
    
    // Should navigate to contact page
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
    await expect(page.locator('h1')).toContainText('Get in Touch');
  });


  test('iPhone 12/13/14 compatibility', async ({ page }) => {
    // Test on iPhone 12/13/14 dimensions (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    
    // Check content displays properly on modern iPhone
    await expect(page.locator('h1')).toContainText('Simplicity at Scale');
    await expect(page.locator('.brand')).toBeVisible();
    
    // Check serpentine curve renders properly
    await expect(page.locator('.serpentine svg')).toBeVisible();
    
    // Test CTA button
    await expect(page.locator('a.cta')).toBeVisible();
  });

  test('large phone (Samsung Galaxy) compatibility', async ({ page }) => {
    // Test on large phone screen
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto(BASE_URL);
    
    // Check content displays well on larger mobile screen
    await expect(page.locator('h1')).toContainText('Simplicity at Scale');
    await expect(page.locator('.brand')).toBeVisible();
    
    // Check mature design elements
    await expect(page.locator('.wrap')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    
    // Test navigation
    await expect(page.locator('.desktop-menu a[href="/about"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/services"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/contact"]')).toBeVisible();
  });
});