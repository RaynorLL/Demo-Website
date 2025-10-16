# Demo Website 
## Quick Start 
### Live Demo
https://raynorll.github.io/Demo-Website/
### Installation
```bash
# Clone the repository
git clone
# Install dependencies
npm install
# Install Playwright browsers
npx playwright install
```
### Technologies Used

- **HTML** - Semantic markup
- **CSS** - Custom properties, Flexbox, Grid
- **JavaScript** - Modular architecture
- **Bootstrap** - Responsive framework
- **Playwright** - End-to-end automation testing

## Project Structure
```
demo/
├── index.html                    # Main HTML file
├── demo.css                     # Stylesheet with CSS variables
├── demo.js                      # Modular JavaScript
├── README.md                    # Project overview (this file)
│
├── dist/assets/img/portfolio/   # Portfolio images
│
└── tests/                       # Playwright test suite
    ├── complete-website.spec.ts
    ├── responsive.spec.ts
    └── utils/test-utils.ts
```
## Features 
### 1. Responsive Navigation (mobile, tablet, desktop) 
- Fixed navigation bar
- Smooth scroll to sections
- Mobile-friendly hamburger menu
- Auto-close on mobile after selection
- Scroll-triggered background change

### 2. Animated Statistics

- Intersection Observer API
- Smooth counter animations
- Configurable duration
- One-time trigger

### 3. Portfolio Filtering

- Category-based filtering
- Smooth show/hide animations
- Active state management
- Responsive grid layout

### 4. Portfolio Modals

- Bootstrap modal integration
- Click animations
- Detailed project information
- Close functionality

### 5. Contact Form

- Client-side validation
- Form submission handling
- Reset after submission
- User feedback

## Testing
### Test Files
- `responsive.spec.ts` - Responsive design tests
- `complete-website.spec.ts` - End-to-end website tests
### Utilities
- `tests/utils/test-utils.ts` - Helper functions for common test operations
## Test Coverage
### Responsive Tests
- Mobile viewport (375x667)
- Tablet viewport (768x1024) 
- Desktop viewport (1920x1080) 
- Mobile menu interactions 
- Cross-device functionality 
### Complete Website Tests 
- Page loading and structure 
- Smooth scrolling 
- Navbar scroll effects 
- Modal functionality 
- Animation testing 
- Keyboard navigation 
- Accessibility checks - Image loading
