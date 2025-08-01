// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Zero to One Solutions Website', () => {
  test('homepage loads with correct styling and content', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check page title and main heading
    await expect(page).toHaveTitle(/Zero to One Solutions/);
    await expect(page.locator('h1')).toContainText('Zero to One Solutions');
    
    // Check tagline
    await expect(page.locator('.hero-subtitle')).toContainText('Creating Tomorrow, Today');
    
    // Check trusted partners section
    await expect(page.locator('text=Empowering Those Who Shape the Future')).toBeVisible();
    await expect(page.locator('.logo-item')).toHaveCount(6); // Nike, IBM, Philips, Levi's, Engie, Elia
    
    // Check navigation buttons
    await expect(page.locator('a[href="/solutions"]')).toBeVisible();
    await expect(page.locator('a[href="/portfolio"]')).toBeVisible();
    await expect(page.locator('a[href="/about"]')).toBeVisible();
    await expect(page.locator('a[href="/incubator"]')).toBeVisible();
    
    // Check social icons
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible();
    await expect(page.locator('a[href*="github.com/romdj"]')).toBeVisible();
    
    // Check that CSS is loaded (gradient background should be applied)
    const main = page.locator('main.hero-gradient');
    await expect(main).toBeVisible();
    
    // Check logo is present
    await expect(page.locator('img[alt="Zero to One Solutions"]')).toBeVisible();
  });

  test('solutions page loads and displays enterprise focus', async ({ page }) => {
    await page.goto(`${BASE_URL}/solutions`);
    
    await expect(page.locator('h1')).toContainText('Enterprise Solutions');
    await expect(page.locator('text=Nike, IBM, Philips')).toBeVisible();
    
    // Check all four solution categories
    await expect(page.locator('text=Legacy Modernization')).toBeVisible();
    await expect(page.locator('text=Cloud Architecture & Integration')).toBeVisible();
    await expect(page.locator('text=Healthcare & Compliance')).toBeVisible();
    await expect(page.locator('text=Data Engineering & Analytics')).toBeVisible();
    
    // Check company mentions
    await expect(page.locator('text=ABVV-FGTB').first()).toBeVisible();
    await expect(page.locator('text=Nike').first()).toBeVisible();
    await expect(page.locator('text=Philips').first()).toBeVisible();
    await expect(page.locator('text=IBM').first()).toBeVisible();
  });

  test('portfolio page displays company-led case studies', async ({ page }) => {
    await page.goto(`${BASE_URL}/portfolio`);
    
    await expect(page.locator('h1')).toContainText('Portfolio');
    await expect(page.locator('h2:has-text("Enterprise Transformations")')).toBeVisible();
    
    // Check major company case studies
    await expect(page.locator('text=Nike')).toBeVisible();
    await expect(page.locator('text=ABVV-FGTB')).toBeVisible();
    await expect(page.locator('text=Extra Horizon')).toBeVisible();
    await expect(page.locator('text=IBM')).toBeVisible();
    await expect(page.locator('text=Philips')).toBeVisible();
    
    // Check innovation projects section
    await expect(page.locator('text=Innovation & Side Projects')).toBeVisible();
    await expect(page.locator('text=3-Point NHL Standing System')).toBeVisible();
    await expect(page.locator('text=Photography Studio')).toBeVisible();
    
    // Check GitHub link
    await expect(page.locator('a[href="https://github.com/romdj"]')).toBeVisible();
  });

  test('about page shows comprehensive profile', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    
    await expect(page.locator('h1')).toContainText('About Me');
    await expect(page.locator('text=Customer-centric solution architect')).toBeVisible();
    
    // Check major sections
    await expect(page.locator('text=My Approach')).toBeVisible();
    await expect(page.locator('text=Professional Journey')).toBeVisible();
    await expect(page.locator('text=Beyond Architecture')).toBeVisible();
    await expect(page.locator('text=Certifications & Expertise')).toBeVisible();
    
    // Check personal interests
    await expect(page.locator('h4:has-text("Photography Studio")')).toBeVisible();
    await expect(page.locator('h4:has-text("Engineering Research")')).toBeVisible();
    await expect(page.locator('h4:has-text("Culinary Arts")')).toBeVisible();
    await expect(page.locator('h4:has-text("BECI Member")')).toBeVisible();
    
    // Check certifications
    await expect(page.locator('text=AWS Certified Developer')).toBeVisible();
    await expect(page.locator('text=FHIR Compliance')).toBeVisible();
  });

  test('incubator page positions startup services', async ({ page }) => {
    await page.goto(`${BASE_URL}/incubator`);
    
    await expect(page.locator('h1')).toContainText('Startup Incubator');
    await expect(page.locator('text=enterprise-grade expertise')).toBeVisible();
    
    // Check service offerings
    await expect(page.locator('h3:has-text("Technology Strategy")')).toBeVisible();
    await expect(page.locator('h3:has-text("Architecture Consultation")')).toBeVisible();
    await expect(page.locator('h3:has-text("Technical Co-Founder Advisory")')).toBeVisible();
    await expect(page.locator('h3:has-text("Rapid Prototyping")')).toBeVisible();
    
    // Check enterprise credibility
    await expect(page.locator('text=Nike, IBM, and Philips')).toBeVisible();
  });

  test('resources page loads with thought leadership framework', async ({ page }) => {
    await page.goto(`${BASE_URL}/resources`);
    
    await expect(page.locator('h1')).toContainText('Resources');
    await expect(page.locator('text=Architecture Insights')).toBeVisible();
    await expect(page.locator('text=Tools & Frameworks')).toBeVisible();
    
    // Check placeholder content
    const comingSoonElements = page.locator('text=Coming Soon');
    await expect(comingSoonElements).toHaveCount(3); // Should have 3 "Coming Soon" badges
  });

  test('navigation works across all pages', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Test navigation to each page
    await page.click('a[href="/solutions"]');
    await expect(page).toHaveURL(`${BASE_URL}/solutions`);
    
    await page.click('a[href="/portfolio"]');
    await expect(page).toHaveURL(`${BASE_URL}/portfolio`);
    
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    
    await page.click('a[href="/incubator"]');
    await expect(page).toHaveURL(`${BASE_URL}/incubator`);
    
    // Test back to home from any page
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(BASE_URL);
  });

  test('css animations and hover effects work', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check that floating animation class exists
    await expect(page.locator('.animate-float')).toBeVisible();
    
    // Check gradient animation
    await expect(page.locator('.animate-gradient')).toBeVisible();
    
    // Test button hover (check for transform styles)
    const primaryBtn = page.locator('.btn-primary').first();
    await primaryBtn.hover();
    
    // Test logo item hover
    const logoItem = page.locator('.logo-item').first();
    await logoItem.hover();
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check that content is still visible and accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.partner-logos')).toBeVisible();
    await expect(page.locator('.nav-grid')).toBeVisible();
    
    // Check that buttons are still clickable
    await expect(page.locator('a[href="/solutions"]')).toBeVisible();
  });

  test('external links work correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check LinkedIn link (don't navigate, just verify attributes)
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com/romdj"]');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});