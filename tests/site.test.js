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

    await expect(page.locator('h1')).toContainText('Let\'s Work Together');
    await expect(page.locator('text=Choose the path that fits your needs')).toBeVisible();
    await expect(page.locator('text=Enterprise Solutions')).toBeVisible();
  });

  test('about page shows professional journey', async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);

    await expect(page.locator('h1')).toContainText('About Zero to One');
    await expect(page.locator('text=Transforming complexity into clarity')).toBeVisible();
    await expect(page.locator('text=Our Story')).toBeVisible();
    await expect(page.locator('text=What Drives Us')).toBeVisible();
    await expect(page.locator('text=Beyond the Code')).toBeVisible();
  });

  test('navigation works across all pages', async ({ page }) => {
    // Test direct navigation to each page
    await page.goto(`${BASE_URL}/work`);
    await expect(page).toHaveURL(`${BASE_URL}/work`);

    await page.goto(`${BASE_URL}/contact`);
    await expect(page).toHaveURL(`${BASE_URL}/contact`);
    await expect(page.locator('h1')).toContainText('Let\'s Work Together');

    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveURL(`${BASE_URL}/about`);
    await expect(page.locator('h1')).toContainText('About Zero to One');

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

  test('in-house products page shows package offerings', async ({ page }) => {
    await page.goto(`${BASE_URL}/in-house/products`);

    // Check hero section
    await expect(page.locator('h1')).toContainText('You Have the Vision');

    // Check all three scenario sections are present
    await expect(page.locator('text=The Founder with an Idea')).toBeVisible();
    await expect(page.locator('text=The Exec with a Moonshot')).toBeVisible();
    await expect(page.locator('text=The Team Ready to Scale')).toBeVisible();

    // Check package cards are present (should have 9 total: 3 per scenario)
    const packageCards = page.locator('.package-card');
    await expect(packageCards).toHaveCount(9);

    // Check featured packages are marked (should have 3)
    const featuredPackages = page.locator('.package-card.featured');
    await expect(featuredPackages).toHaveCount(3);

    // Check Technical Mastery section is visible
    await expect(page.locator('text=Technical Mastery')).toBeVisible();
  });

  test('work page displays case studies with updated layout', async ({ page }) => {
    await page.goto(`${BASE_URL}/work`);

    // Check hero section
    await expect(page.locator('h1')).toContainText('Enterprise Solutions');

    // Check Featured Transformations section
    await expect(page.locator('text=Featured Transformations')).toBeVisible();

    // Check case study cards are present
    const caseStudyCards = page.locator('.case-study-card');
    await expect(caseStudyCards.first()).toBeVisible();

    // Check Additional Client Work section
    await expect(page.locator('text=Additional Client Work')).toBeVisible();

    // Check work cards have horizontal scroll container
    const workGrid = page.locator('.work-grid');
    await expect(workGrid).toBeVisible();
  });

  test('removed pages return 404 or redirect', async ({ page }) => {
    // Test that incubator page no longer exists
    const incubatorResponse = await page.goto(`${BASE_URL}/incubator`);
    expect(incubatorResponse?.status()).toBe(404);

    // Test that portfolio page no longer exists
    const portfolioResponse = await page.goto(`${BASE_URL}/portfolio`);
    expect(portfolioResponse?.status()).toBe(404);
  });

  test('contact page links to in-house instead of incubator', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);

    // Check that links point to /in-house instead of /incubator
    const inHouseLinks = page.locator('a[href="/in-house"]');
    await expect(inHouseLinks.first()).toBeVisible();

    // Ensure no incubator links exist
    const incubatorLinks = page.locator('a[href="/incubator"]');
    await expect(incubatorLinks).toHaveCount(0);
  });
});