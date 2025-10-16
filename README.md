# Demo Agency - Playwright Testing Suite

This directory contains comprehensive Playwright automation tests for the Demo Agency website.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (for local server)

### Installation
```bash
# Install Playwright
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View test report
npm run test:report
```

## 📁 Test Structure

### Test Files
- `navigation.spec.ts` - Navigation and menu tests
- `portfolio.spec.ts` - Portfolio filtering and modal tests
- `statistics.spec.ts` - Statistics animation tests
- `contact-form.spec.ts` - Contact form validation tests
- `responsive.spec.ts` - Responsive design tests
- `complete-website.spec.ts` - End-to-end website tests

### Utilities
- `tests/utils/test-utils.ts` - Helper functions for common test operations

## 🧪 Test Coverage

### Navigation Tests
- ✅ All navigation links present and working
- ✅ Smooth scrolling between sections
- ✅ Mobile menu functionality
- ✅ Navbar brand link

### Portfolio Tests
- ✅ Portfolio section display
- ✅ Filter buttons functionality
- ✅ Portfolio item filtering
- ✅ Modal opening/closing
- ✅ Hover effects

### Statistics Tests
- ✅ Services section display
- ✅ Statistics counters animation
- ✅ Scroll-triggered animations
- ✅ Correct target values

### Contact Form Tests
- ✅ Form field validation
- ✅ Required field checks
- ✅ Form submission
- ✅ Form reset after submission
- ✅ Email format validation

### Responsive Tests
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1920x1080)
- ✅ Mobile menu interactions
- ✅ Cross-device functionality

### Complete Website Tests
- ✅ Page loading and structure
- ✅ Smooth scrolling
- ✅ Navbar scroll effects
- ✅ Modal functionality
- ✅ Animation testing
- ✅ Keyboard navigation
- ✅ Accessibility checks
- ✅ Image loading
- ✅ Error handling

## 🎯 Test Scenarios

### Cross-Browser Testing
- Chrome (Chromium)
- Firefox
- Safari (WebKit)
- Mobile Chrome
- Mobile Safari

### Device Testing
- iPhone 12 (375x812)
- Pixel 5 (393x851)
- iPad (768x1024)
- Desktop (1920x1080)

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- Base URL: `http://localhost:3000`
- Test directory: `./tests`
- Reporter: HTML
- Screenshots: On failure
- Trace: On first retry

### Local Server
The tests automatically start a local Python HTTP server on port 3000 to serve the demo files.

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npm run test:report
```

The report includes:
- Test results summary
- Screenshots of failures
- Video recordings
- Performance metrics
- Accessibility reports

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Headed Mode
```bash
npm run test:headed
```

### UI Mode
```bash
npm run test:ui
```

## 📝 Writing New Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo.html');
  });

  test('should test feature', async ({ page }) => {
    // Test implementation
  });
});
```

### Using Test Utils
```typescript
import { TestUtils } from './utils/test-utils';

test('should use utils', async ({ page }) => {
  const utils = new TestUtils(page);
  await utils.scrollToSection('services');
  await utils.waitForStatisticsAnimation();
});
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm install
    - run: npx playwright install
    - run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

## 📈 Performance Testing

The test suite includes performance checks:
- Page load times
- Animation performance
- Responsive behavior
- Cross-browser compatibility

## 🔍 Accessibility Testing

Built-in accessibility checks:
- Proper heading structure
- Form labels
- Button accessibility
- Keyboard navigation
- Screen reader compatibility

## 📱 Mobile Testing

Comprehensive mobile testing:
- Touch interactions
- Mobile menu functionality
- Responsive layouts
- Performance on mobile devices

---

**Note:** Make sure to run `npm install` before running tests to install all dependencies.

