// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Zero to One Solutions Website', () => {
  test('homepage loads with correct styling and content', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check page title and main heading (updated to mature design)
    await expect(page).toHaveTitle(/Zero to One Solutions — Simplicity at Scale/);
    await expect(page.locator('h1')).toContainText("Simplicity at Scale");
    
    // Check tagline and content (updated to mature design)
    await expect(page.locator('text=Complex challenges deserve elegant solutions.')).toBeVisible();
    await expect(page.locator('text=By turning ideas into actionable plans, we connect vision to delivery')).toBeVisible();
    
    // Check C1 logo and brand text in navigation
    await expect(page.locator('.brand')).toBeVisible();
    await expect(page.locator('text=Zero to One')).toBeVisible();
    
    // Check main CTA button
    await expect(page.locator('a.cta')).toContainText('Get in touch');
    
    // Check navigation items (desktop navigation)
    await expect(page.locator('.desktop-menu a[href="/about"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/services"]')).toBeVisible();
    await expect(page.locator('.desktop-menu a[href="/contact"]')).toBeVisible();
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
    
    // Check CTA button interaction
    const ctaButton = page.locator('a.cta');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Get in touch');
    
    // Check serpentine curve SVG
    await expect(page.locator('.serpentine svg')).toBeVisible();
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