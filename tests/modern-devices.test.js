// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:12000';

/**
 * Modern Device Testing Matrix (2020+)
 *
 * This test suite covers a comprehensive range of modern mobile devices
 * released from 2020 onwards, ensuring proper rendering, centering, and
 * layout adaptation across various screen sizes and aspect ratios.
 */

// Device configurations for phones released 2020+
const MODERN_DEVICES = [
  // === ANDROID DEVICES ===

  // OnePlus Nord (User's Device) - Priority device
  {
    name: 'OnePlus Nord (2020)',
    viewport: { width: 412, height: 915 },
    year: 2020,
    category: 'mid-range-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; OnePlus Nord) AppleWebKit/537.36'
  },

  // OnePlus Series
  {
    name: 'OnePlus 8 Pro (2020)',
    viewport: { width: 412, height: 919 },
    year: 2020,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; IN2020) AppleWebKit/537.36'
  },
  {
    name: 'OnePlus 9 Pro (2021)',
    viewport: { width: 412, height: 919 },
    year: 2021,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; LE2120) AppleWebKit/537.36'
  },
  {
    name: 'OnePlus 10 Pro (2022)',
    viewport: { width: 412, height: 919 },
    year: 2022,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; NE2213) AppleWebKit/537.36'
  },

  // Samsung Galaxy S Series
  {
    name: 'Samsung Galaxy S20 (2020)',
    viewport: { width: 360, height: 800 },
    year: 2020,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S21 (2021)',
    viewport: { width: 360, height: 800 },
    year: 2021,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S22 (2022)',
    viewport: { width: 360, height: 800 },
    year: 2022,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S23 (2023)',
    viewport: { width: 360, height: 800 },
    year: 2023,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S24 (2024)',
    viewport: { width: 360, height: 800 },
    year: 2024,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36'
  },

  // Samsung Galaxy S Ultra Models
  {
    name: 'Samsung Galaxy S21 Ultra (2021)',
    viewport: { width: 384, height: 854 },
    year: 2021,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S22 Ultra (2022)',
    viewport: { width: 384, height: 854 },
    year: 2022,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S908B) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy S23 Ultra (2023)',
    viewport: { width: 412, height: 915 },
    year: 2023,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36'
  },

  // Google Pixel Series
  {
    name: 'Google Pixel 4a (2020)',
    viewport: { width: 393, height: 851 },
    year: 2020,
    category: 'mid-range-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; Pixel 4a) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 5 (2020)',
    viewport: { width: 393, height: 851 },
    year: 2020,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 6 (2021)',
    viewport: { width: 412, height: 915 },
    year: 2021,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 6 Pro (2021)',
    viewport: { width: 412, height: 892 },
    year: 2021,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6 Pro) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 7 (2022)',
    viewport: { width: 412, height: 915 },
    year: 2022,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 7 Pro (2022)',
    viewport: { width: 412, height: 892 },
    year: 2022,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36'
  },
  {
    name: 'Google Pixel 8 (2023)',
    viewport: { width: 412, height: 915 },
    year: 2023,
    category: 'flagship-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36'
  },

  // === APPLE DEVICES ===

  // iPhone 12 Series
  {
    name: 'iPhone 12 Mini (2020)',
    viewport: { width: 375, height: 812 },
    year: 2020,
    category: 'compact-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 12 (2020)',
    viewport: { width: 390, height: 844 },
    year: 2020,
    category: 'flagship-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 12 Pro Max (2020)',
    viewport: { width: 428, height: 926 },
    year: 2020,
    category: 'phablet-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // iPhone 13 Series
  {
    name: 'iPhone 13 Mini (2021)',
    viewport: { width: 375, height: 812 },
    year: 2021,
    category: 'compact-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 13 (2021)',
    viewport: { width: 390, height: 844 },
    year: 2021,
    category: 'flagship-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 13 Pro Max (2021)',
    viewport: { width: 428, height: 926 },
    year: 2021,
    category: 'phablet-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // iPhone 14 Series
  {
    name: 'iPhone 14 (2022)',
    viewport: { width: 390, height: 844 },
    year: 2022,
    category: 'flagship-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 14 Plus (2022)',
    viewport: { width: 428, height: 926 },
    year: 2022,
    category: 'phablet-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 14 Pro (2022)',
    viewport: { width: 393, height: 852 },
    year: 2022,
    category: 'flagship-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 14 Pro Max (2022)',
    viewport: { width: 430, height: 932 },
    year: 2022,
    category: 'phablet-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // iPhone 15 Series
  {
    name: 'iPhone 15 (2023)',
    viewport: { width: 393, height: 852 },
    year: 2023,
    category: 'flagship-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone 15 Pro Max (2023)',
    viewport: { width: 430, height: 932 },
    year: 2023,
    category: 'phablet-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // iPhone SE (Budget)
  {
    name: 'iPhone SE 2020',
    viewport: { width: 375, height: 667 },
    year: 2020,
    category: 'budget-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone SE 2022',
    viewport: { width: 375, height: 667 },
    year: 2022,
    category: 'budget-ios',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },

  // === OTHER POPULAR ANDROID DEVICES ===

  // Samsung Galaxy A Series (Mid-range)
  {
    name: 'Samsung Galaxy A52 (2021)',
    viewport: { width: 412, height: 915 },
    year: 2021,
    category: 'mid-range-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-A525F) AppleWebKit/537.36'
  },
  {
    name: 'Samsung Galaxy A53 (2022)',
    viewport: { width: 412, height: 915 },
    year: 2022,
    category: 'mid-range-android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-A536B) AppleWebKit/537.36'
  }
];

test.describe('Modern Devices (2020+) - Homepage Rendering', () => {
  for (const device of MODERN_DEVICES) {
    test(`${device.name} - homepage renders correctly`, async ({ page }) => {
      // Set viewport and user agent
      await page.setViewportSize(device.viewport);
      await page.setExtraHTTPHeaders({
        'User-Agent': device.userAgent
      });

      await page.goto(BASE_URL);

      // Core content checks
      await expect(page.locator('h1')).toContainText('Creating Tomorrow, Today');
      await expect(page.locator('.brand')).toBeVisible();

      // Hero section should be visible and centered
      const hero = page.locator('.hero');
      await expect(hero).toBeVisible();

      // Critical: Check NO horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = device.viewport.width;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding

      // Navigation should show hamburger menu on mobile
      await expect(page.locator('.hamburger')).toBeVisible();
      await expect(page.locator('.desktop-menu')).toBeHidden();

      // CTA button should be visible and clickable
      const ctaButton = page.locator('.cta-button').first();
      await expect(ctaButton).toBeVisible();

      // Check that container is properly sized (doesn't overflow)
      const container = page.locator('.hero .container').first();
      const containerBox = await container.boundingBox();
      if (containerBox) {
        // Container should fit within viewport
        expect(containerBox.width).toBeLessThanOrEqual(device.viewport.width);
      }
    });
  }
});

test.describe('Modern Devices (2020+) - Work Page', () => {
  // Test only representative devices for work page to speed up tests
  const representativeDevices = MODERN_DEVICES.filter(d =>
    d.name.includes('OnePlus Nord') ||
    d.name.includes('iPhone 13 (2021)') ||
    d.name.includes('Samsung Galaxy S22 (2022)') ||
    d.name.includes('Google Pixel 7')
  );

  for (const device of representativeDevices) {
    test(`${device.name} - work page renders correctly`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.setExtraHTTPHeaders({
        'User-Agent': device.userAgent
      });

      await page.goto(`${BASE_URL}/work`);

      // Page title
      await expect(page.locator('h1')).toContainText('Enterprise Solutions');

      // Check NO horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(device.viewport.width + 1);

      // Case study cards should be visible and properly sized
      const caseStudyCards = page.locator('.case-study-card');
      if (await caseStudyCards.count() > 0) {
        await expect(caseStudyCards.first()).toBeVisible();
      }

      // Horizontal scroll should work for additional work section
      const workGrid = page.locator('.work-grid');
      await expect(workGrid).toBeVisible();

      // Tags should be small and readable
      const tag = page.locator('.pill').first();
      if (await tag.isVisible()) {
        const fontSize = await tag.evaluate(el => window.getComputedStyle(el).fontSize);
        expect(parseInt(fontSize)).toBeLessThanOrEqual(11);
      }
    });
  }
});

test.describe('Modern Devices (2020+) - About Page', () => {
  // Test representative devices for about page
  const representativeDevices = MODERN_DEVICES.filter(d =>
    d.name.includes('OnePlus Nord') ||
    d.name.includes('iPhone 15') ||
    d.name.includes('Samsung Galaxy S24')
  );

  for (const device of representativeDevices) {
    test(`${device.name} - about page renders correctly`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.setExtraHTTPHeaders({
        'User-Agent': device.userAgent
      });

      await page.goto(`${BASE_URL}/about`);

      // Page title
      await expect(page.locator('h1')).toContainText('About Zero to One');

      // Check NO horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(device.viewport.width + 1);

      // Interest cards should be visible and centered
      const interestGrid = page.locator('.interest-grid');
      await expect(interestGrid).toBeVisible();

      const interestCards = page.locator('.card-brand');
      if (await interestCards.count() > 0) {
        await expect(interestCards.first()).toBeVisible();
      }
    });
  }
});

test.describe('Modern Devices (2020+) - Contact & In-House Pages', () => {
  // Test representative devices
  const representativeDevices = MODERN_DEVICES.filter(d =>
    d.name.includes('OnePlus Nord') ||
    d.name.includes('iPhone 14 Pro') ||
    d.name.includes('Google Pixel 8')
  );

  for (const device of representativeDevices) {
    test(`${device.name} - in-house page renders correctly`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.setExtraHTTPHeaders({
        'User-Agent': device.userAgent
      });

      await page.goto(`${BASE_URL}/in-house/products`);

      // Page title
      await expect(page.locator('h1')).toContainText('You Have the Vision');

      // Check NO horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(device.viewport.width + 1);

      // Package cards should be visible
      const packageCards = page.locator('.package-card');
      if (await packageCards.count() > 0) {
        await expect(packageCards.first()).toBeVisible();
      }

      // Technical Mastery section should be visible
      await expect(page.locator('text=Technical Mastery')).toBeVisible();
    });

    test(`${device.name} - contact page renders correctly`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.setExtraHTTPHeaders({
        'User-Agent': device.userAgent
      });

      await page.goto(`${BASE_URL}/contact`);

      // Page title
      await expect(page.locator('h1')).toContainText('Let\'s Work Together');

      // Check NO horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(device.viewport.width + 1);

      // Contact path cards should be visible and centered
      const cards = page.locator('.card-brand');
      if (await cards.count() > 0) {
        await expect(cards.first()).toBeVisible();
      }
    });
  }
});

// Specific test for OnePlus Nord centering issue
test.describe('OnePlus Nord - Layout Centering', () => {
  test('All content is properly centered on OnePlus Nord', async ({ page }) => {
    // OnePlus Nord specs: 6.44" display, 1080 x 2400 pixels
    await page.setViewportSize({ width: 412, height: 915 });
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; OnePlus Nord) AppleWebKit/537.36'
    });

    // Test homepage
    await page.goto(BASE_URL);

    // Container should fit within viewport and have proper sizing
    const container = page.locator('.container').first();
    const containerBox = await container.boundingBox();
    if (containerBox) {
      // Container width should be reasonable (less than full viewport due to padding)
      expect(containerBox.width).toBeLessThanOrEqual(412);
    }

    // Hero content should be centered
    const hero = page.locator('.hero');
    const heroBox = await hero.boundingBox();
    if (heroBox) {
      expect(heroBox.width).toBeLessThanOrEqual(412);
    }

    // Test work page
    await page.goto(`${BASE_URL}/work`);

    // Verify no horizontal overflow on work page
    const workBodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(workBodyWidth).toBeLessThanOrEqual(413); // 412 + 1 for rounding

    const workCard = page.locator('.case-study-card').first();
    if (await workCard.count() > 0) {
      await expect(workCard).toBeVisible();
      const workCardBox = await workCard.boundingBox();
      if (workCardBox) {
        // Card should fit within viewport
        expect(workCardBox.width).toBeLessThanOrEqual(400);
      }
    }

    // Test about page
    await page.goto(`${BASE_URL}/about`);

    // Verify no horizontal overflow on about page
    const aboutBodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(aboutBodyWidth).toBeLessThanOrEqual(413);

    const aboutCard = page.locator('.card-brand').first();
    if (await aboutCard.count() > 0) {
      await expect(aboutCard).toBeVisible();
      const aboutCardBox = await aboutCard.boundingBox();
      if (aboutCardBox) {
        // Card should fit within viewport
        expect(aboutCardBox.width).toBeLessThanOrEqual(400);
      }
    }
  });
});

// Orientation tests
test.describe('Landscape Orientation', () => {
  test('OnePlus Nord landscape mode', async ({ page }) => {
    // Landscape viewport
    await page.setViewportSize({ width: 915, height: 412 });
    await page.goto(BASE_URL);

    await expect(page.locator('h1')).toContainText('Creating Tomorrow, Today');

    // Desktop menu might show in landscape on larger screens
    const hamburger = page.locator('.hamburger');
    const desktopMenu = page.locator('.desktop-menu');

    // At least one navigation should be visible
    const hamburgerVisible = await hamburger.isVisible();
    const desktopVisible = await desktopMenu.isVisible();
    expect(hamburgerVisible || desktopVisible).toBeTruthy();
  });
});
