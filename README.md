# Playwright Tests

This repository uses Playwright for end-to-end testing.

## 🏃 Running Tests Locally

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ccmyron/binarcode-task.git
   cd binarcode-task
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   echo "USER_PASSWORD=${YOUR_PASSWORD}" >> .env
   # Add the USER_PASSWORD variable to the .env file
   ```

4. Install Playwright browsers
   ```bash
   npx playwright install --with-deps
   ```

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/example.spec.ts
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

Generate and open an HTML report:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

## 📁 Test Structure

```
page-objects/
├──page-name-1
    ├──page/modal/popup-name.ts
    ├──page/modal/popup-name.ts
    └──page/modal/popup-name.ts
└──page-name-2
    ├──page/modal/popup-name.ts
    ├──page/modal/popup-name.ts
    └──page/modal/popup-name.ts
tests/
├── *.setup.ts          # Authentication tests
└── *.test.ts           # Feature tests
```

## 🔄 CI/CD Integration

Tests run automatically on:
- Every push to the main branch
- Every pull request targeting the main branch

The GitHub Actions workflow:
1. Sets up the test environment
2. Runs all tests
3. Uploads the test results as an artifact

You can take a look at the runs [here](https://github.com/ccmyron/binarcode-task/actions) 

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Configuration Guide](https://playwright.dev/docs/test-configuration)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)