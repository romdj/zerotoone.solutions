// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

test.describe('Zero to One Solutions Website', () => {
  test('homepage loads with correct styling and content', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check page title and main heading (updated to current content)
    await expect(page).toHaveTitle(/Zero to One Solutions/);
    await expect(page.locator('h1')).toContainText("Engineering Wins Aren't Enough  —  Vision Is");
    
    // Check tagline
    await expect(page.locator('text=By turning ideas into actionable plans, We connect vision to delivery.')).toBeVisible();
    
    // Check logo is present
    await expect(page.locator('img[alt="Zero to One Solutions"]')).toBeVisible();
    
    // Check storytelling sections
    await expect(page.locator('text=Focus on making your beer taste better')).toBeVisible();
    await expect(page.locator('text=Counter Positioning')).toBeVisible();
    await expect(page.locator('text=Switching costs do and will impact your business')).toBeVisible();
    
    // Check company sections (now using logos instead of text)
    await expect(page.locator('text=Trusted by Industry Leaders')).toBeVisible();
    await expect(page.locator('img[alt="Nike"]')).toBeVisible();
    await expect(page.locator('img[alt="IBM"]')).toBeVisible();
    await expect(page.locator('img[alt="Philips"]')).toBeVisible();
    // Scroll to ABVV section first, then check for ABVV text (no logo)
    await page.locator('text=ABVV').first().scrollIntoViewIfNeeded();
    await expect(page.locator('text=ABVV')).toBeVisible();
    
    // Check final navigation section
    await expect(page.locator('text=Ready to write your story?')).toBeVisible();
    await expect(page.locator('a[href="/solutions"]')).toBeVisible();
    await expect(page.locator('a[href="/portfolio"]')).toBeVisible();
    await expect(page.locator('a[href="/about"]')).toBeVisible();
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
    
    // Check major company case studies (use more specific selectors)
    await expect(page.locator('text=Nike').first()).toBeVisible();
    await expect(page.locator('text=ABVV-FGTB').first()).toBeVisible();
    await expect(page.locator('text=Extra Horizon').first()).toBeVisible();
    await expect(page.locator('text=IBM').first()).toBeVisible();
    await expect(page.locator('text=Philips').first()).toBeVisible();
    
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
    await expect(comingSoonElements).toHaveCount(7); // Should have 7 "Coming Soon" badges
  });

  test('navigation works across all pages', async ({ page }) => {
    // Test direct navigation to each page
    await page.goto(`${BASE_URL}/solutions`);
    await expect(page).toHaveURL(`${BASE_URL}/solutions`);
    
    await page.goto(`${BASE_URL}/portfolio`);
    await expect(page).toHaveURL(`${BASE_URL}/portfolio`);
    
    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    
    await page.goto(`${BASE_URL}/incubator`);
    await expect(page).toHaveURL(`${BASE_URL}/incubator`);
    
    await page.goto(`${BASE_URL}/resources`);
    await expect(page).toHaveURL(`${BASE_URL}/resources`);
    
    // Test back to home
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
  });

  test('css animations and hover effects work', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check that floating animation class exists (logo animation)
    await expect(page.locator('.animate-float')).toBeVisible();
    
    // Check gradient animation (hero section)
    await expect(page.locator('.animate-gradient')).toBeVisible();
    
    // Check that expand buttons exist (story sections)
    const expandBtn = page.locator('.expand-btn').first();
    await expect(expandBtn).toBeVisible();
    await expect(expandBtn).toContainText('Explore the Story');
    
    // Check company sections are visible
    await expect(page.locator('text=Nike').first()).toBeVisible();
    await expect(page.locator('text=IBM').first()).toBeVisible();
  });

  test.skip('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check that content is still visible and accessible
    await expect(page.locator('h1')).toContainText("Engineering Wins Aren't Enough  —  Vision Is");
    await expect(page.locator('img[alt="Zero to One Solutions"]')).toBeVisible();
    
    // Check storytelling sections are responsive
    await expect(page.locator('text=Focus on making your beer taste better')).toBeVisible();
    
    // Test scroll functionality works on mobile
    const scrollBtn = page.locator('button:has-text("See these principles in action")');
    if (await scrollBtn.isVisible()) {
      await scrollBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('text=Trusted by Industry Leaders')).toBeVisible();
    }
    
    // Scroll to bottom for navigation
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('a[href="/solutions"]')).toBeVisible();
  });

  test('external links work correctly', async ({ page }) => {
    // Test external links on portfolio page where they're more prominent
    await page.goto(`${BASE_URL}/portfolio`);
    
    // Check GitHub link in portfolio
    const githubLink = page.locator('a[href="https://github.com/romdj"]');
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check meetup link exists (may not have target="_blank")
    const meetupLink = page.locator('a[href*="meetup.com"]');
    await expect(meetupLink).toBeVisible();
    await expect(meetupLink).toHaveAttribute('href', /meetup\.com/);
  });
});