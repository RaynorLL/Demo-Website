import { Page, expect } from '@playwright/test';

export class TestUtils {
  constructor(private page: Page) {}

  async waitForAnimation(selector: string, timeout = 3000) {
    await this.page.waitForSelector(selector, { state: 'visible' });
    await this.page.waitForTimeout(timeout);
  }

  async scrollToSection(sectionId: string) {
    await this.page.click(`a[href="#${sectionId}"]`);
    await this.page.waitForTimeout(500);
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.fill('#message', message);
  }

  async submitContactForm() {
    await this.page.click('button[type="submit"]');
  }

  async openPortfolioModal(modalIndex: number) {
    await this.page.click(`.portfolio-item:nth-child(${modalIndex + 1})`);
    await this.page.waitForSelector(`#portfolioModal${modalIndex + 1}`, { state: 'visible' });
  }

  async closePortfolioModal(modalIndex: number) {
    await this.page.click(`#portfolioModal${modalIndex + 1} .btn-close`);
    await this.page.waitForSelector(`#portfolioModal${modalIndex + 1}`, { state: 'hidden' });
  }

  async filterPortfolio(filterName: string) {
    await this.page.click(`.filter-btn[data-filter="${filterName}"]`);
  }

  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async waitForStatisticsAnimation() {
    await this.page.locator('#services .border-top').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000);
  }

  async checkStatisticsValues() {
    const statisticNumbers = this.page.locator('.statistic-number');
    await expect(statisticNumbers.nth(0)).toHaveText('150');
    await expect(statisticNumbers.nth(1)).toHaveText('98');
    await expect(statisticNumbers.nth(2)).toHaveText('5');
    await expect(statisticNumbers.nth(3)).toHaveText('24');
  }

  async checkMobileMenu() {
    const mobileMenuButton = this.page.locator('.navbar-toggler');
    const mobileMenu = this.page.locator('.navbar-collapse');
    
    await expect(mobileMenuButton).toBeVisible();
    await mobileMenuButton.click();
    await expect(mobileMenu).toHaveClass(/show/);
  }

  async checkFormValidation() {
    const nameField = this.page.locator('#name');
    const emailField = this.page.locator('#email');
    const messageField = this.page.locator('#message');
    
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(messageField).toHaveAttribute('required');
  }
}

