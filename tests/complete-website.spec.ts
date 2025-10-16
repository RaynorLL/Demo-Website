import { expect, test } from '@playwright/test';

test.describe('Complete Website Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Check page title
    await expect(page).toHaveTitle('Demo Website - Professional Web Solutions');
    
    // Check if main sections are present
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#portfolio')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Check navbar
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('.navbar-brand')).toHaveText('Demo Website');
    
    // Check hero section
    await expect(page.locator('#home h1')).toHaveText('Welcome to Our Website');
    await expect(page.locator('#home .lead')).toHaveText('We provide simple and effective solutions');
    
    // Check footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Demo Website');
  });

  test('should have working smooth scrolling', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Test smooth scrolling to each section
    await page.click('a[href="#services"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#services')).toBeInViewport();
    
    await page.click('a[href="#portfolio"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#portfolio')).toBeInViewport();
    
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#contact')).toBeInViewport();
    
    await page.click('a[href="#home"]');
    await page.waitForTimeout(500);
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('should have navbar scroll effect', async ({ page }) => {
    await page.goto('/demo.html');
    
    const navbar = page.locator('.navbar');
    
    // Initially navbar should not have scroll class
    await expect(navbar).not.toHaveClass(/navbar-scrolled/);
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(100);
    
    // Check if navbar has scroll class
    await expect(navbar).toHaveClass(/navbar-scrolled/);
  });

  test('should have working modals', async ({ page }) => {
    await page.goto('/demo.html');
    await page.click('a[href="#portfolio"]');
    
    // Test all three modals
    const portfolioItems = page.locator('.portfolio-item');
    
    for (let i = 0; i < 3; i++) {
      await portfolioItems.nth(i).click();
      
      const modal = page.locator(`#portfolioModal${i + 1}`);
      await expect(modal).toBeVisible();
      
      // Check modal content
      await expect(modal.locator('.modal-title')).toBeVisible();
      await expect(modal.locator('.modal-body')).toBeVisible();
      
      // Close modal
      await modal.locator('.btn-close').click();
      await expect(modal).not.toBeVisible();
    }
  });

  test('should have working animations', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Test statistics animation
    await page.click('a[href="#services"]');
    await page.locator('#services .border-top').scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    
    const statisticNumbers = page.locator('.statistic-number');
    await expect(statisticNumbers.nth(0)).toHaveText('150');
    await expect(statisticNumbers.nth(1)).toHaveText('98');
    await expect(statisticNumbers.nth(2)).toHaveText('5');
    await expect(statisticNumbers.nth(3)).toHaveText('24');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test Enter key on focused element
    await page.keyboard.press('Enter');
    
    // Check if navigation worked
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2')).toHaveCount(3);
    
    // Check for proper form labels
    await page.click('a[href="#contact"]');
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
    
    // Check for proper button labels
    const mobileMenuButton = page.locator('.navbar-toggler');
    await expect(mobileMenuButton).toHaveAttribute('aria-label', 'Toggle navigation');
  });

  test('should load all images', async ({ page }) => {
    await page.goto('/demo.html');
    
    // Check if portfolio images load
    await page.click('a[href="#portfolio"]');
    
    const portfolioImages = page.locator('.portfolio-item img');
    await expect(portfolioImages).toHaveCount(3);
    
    // Check if images have proper alt text
    for (let i = 0; i < 3; i++) {
      await expect(portfolioImages.nth(i)).toHaveAttribute('alt');
    }
  });

});
