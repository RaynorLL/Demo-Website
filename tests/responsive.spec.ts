import { expect, test } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo.html');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    
    // Open the mobile menu (hamburger)
    await page.locator('.navbar-toggler').click();
    await expect(page.locator('.navbar-collapse')).toHaveClass(/show/);
    
    // Check if hero section is responsive
    await expect(page.locator('#home')).toBeVisible();
    
    // Check if services section adapts to mobile
    await page.click('a[href="#services"]');
    await expect(page.locator('#services')).toBeVisible();
    
    // Check if portfolio section is responsive
    await page.click('a[href="#portfolio"]');
    await expect(page.locator('#portfolio')).toBeVisible();
    
    // Check if contact form is responsive
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Check if all navigation links are visible
    const navLinks = page.locator('.navbar-nav .nav-link');
    await expect(navLinks).toHaveCount(4);
    
    // Check if mobile menu button is hidden
    await expect(page.locator('.navbar-toggler')).not.toBeVisible();
    
    // Test all sections are accessible
    await page.click('a[href="#services"]');
    await expect(page.locator('#services')).toBeVisible();
    
    await page.click('a[href="#portfolio"]');
    await expect(page.locator('#portfolio')).toBeVisible();
    
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should handle mobile menu interactions', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileMenuButton = page.locator('.navbar-toggler');
    const mobileMenu = page.locator('.navbar-collapse');
    
    // Initially menu should be collapsed
    await expect(mobileMenu).not.toHaveClass(/show/);
    
    // Click to open menu
    await mobileMenuButton.click();
    await expect(mobileMenu).toHaveClass(/show/);
    
    // Click navigation link should close menu
    await page.click('a[href="#services"]');
    await expect(mobileMenu).not.toHaveClass(/show/);
  });

  test('should maintain functionality across screen sizes', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },   // iPhone SE
      { width: 375, height: 667 },   // iPhone 8
      { width: 768, height: 1024 },  // iPad
      { width: 1024, height: 768 },  // iPad landscape
      { width: 1920, height: 1080 }  // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // If the hamburger is visible at this size, click it once to open menu
      const mobileMenuButton = page.locator('.navbar-toggler');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
      }
    
      // Test navigation
      await page.click('a[href="#portfolio"]');
      await expect(page.locator('#portfolio')).toBeVisible();
      
      // Test portfolio filtering
      const filterButtons = page.locator('.filter-btn');
      await expect(filterButtons).toHaveCount(4);
      
      // Test contact form
      await page.click('a[href="#contact"]');
      await expect(page.locator('#contact')).toBeVisible();
      await expect(page.locator('#name')).toBeVisible();
    }
  });

  test('should have proper text scaling on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if hero text is readable
    await expect(page.locator('#home h1')).toBeVisible();
    await expect(page.locator('#home .lead')).toBeVisible();

    // Open the mobile menu (hamburger)
    await page.locator('.navbar-toggler').click();
    await expect(page.locator('.navbar-collapse')).toHaveClass(/show/);
    
    // Check if service cards are properly sized
    await page.click('a[href="#services"]');
    const serviceCards = page.locator('#services .card');
    await expect(serviceCards).toHaveCount(3);
    
    // Check if portfolio items are properly sized
    await page.click('a[href="#portfolio"]');
    const portfolioItems = page.locator('.portfolio-item');
    await expect(portfolioItems).toHaveCount(3);
  });
});
