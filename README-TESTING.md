# Testing Documentation

This document describes the testing setup and test files created for the OATTS website project.

## Testing Framework

The project uses **Vitest** as the testing framework, which provides:

- Fast test execution with native ES modules support
- TypeScript support out of the box
- Jest-compatible API
- Happy DOM for browser environment simulation

## Test Setup

### Configuration Files

- **`vitest.config.ts`** - Main Vitest configuration
- **`src/test/setup.ts`** - Global test setup with mocks and utilities

### Package Scripts

```bash
npm test        # Run tests in watch mode
npm run test:ui # Run tests with UI interface
npm run test:run # Run tests once and exit
```

## Test Files

### 1. `src/lib/constants.test.ts`

Tests the constants and configuration values used throughout the application:

- **GITHUB_OWNER and GITHUB_REPO** - Validates GitHub repository information
- **BUILD_TARGETS** - Tests all supported build target constants
- **FILE_REGEX** - Validates regex patterns for different file types
- **Cross-validation** - Ensures consistency between BUILD_TARGETS and FILE_REGEX

**Key Test Cases:**

- Validates all build target values are unique strings
- Tests regex patterns match expected file formats
- Ensures ARM/Intel macOS, Linux AppImage, and Windows EXE/MSI patterns work correctly

### 2. `src/components/DownloadCard.test.ts`

Tests the core logic extracted from the DownloadCard Astro component:

#### Functions Tested:

**`findRelease(release, target)`**

- Finds matching assets in GitHub release data
- Handles null/undefined releases gracefully
- Returns empty string when no match found

**`getDownload(release, target)`**

- Generates correct download URLs for all platforms
- Constructs proper GitHub release download links
- Handles missing assets with error logging

**`detectOS(userAgent, platform)`**

- Detects Windows, macOS (ARM/Intel), and Linux
- Falls back to Windows EXE for unknown platforms
- Handles ARM detection for Apple Silicon Macs

**Key Test Cases:**

- Tests all 5 build targets (Windows EXE/MSI, macOS ARM/Intel, Linux)
- Validates URL construction with proper tag names
- Tests OS detection with various user agent strings
- Error handling for missing assets and invalid inputs

### 3. `src/pages/note-to-it.test.ts`

Tests the content structure and messaging of the IT team communication page:

#### Content Validation:

- **Page Structure** - Validates expected headings and content organization
- **Technical Details** - Tests references to file extensions, commands, and paths
- **Security Messaging** - Validates security warnings and explanations
- **Component Structure** - Tests expected imports and HTML elements

**Key Test Cases:**

- Validates installer process steps are documented
- Tests security considerations (antivirus, SIP, MDM, Gatekeeper)
- Ensures proper mention of Apple developer program costs
- Validates transparency messaging about source code availability

## Test Coverage Areas

### ✅ Covered

- Constants and configuration validation
- Core download logic and URL generation
- OS detection functionality
- Content structure validation
- Security messaging verification

### 🔄 Potential Extensions

- Integration tests with actual GitHub API
- DOM rendering tests for Astro components
- E2E tests for download functionality
- Visual regression tests
- Performance tests

## Running Tests

### Development Workflow

```bash
# Start tests in watch mode during development
npm test

# Run tests with coverage
npm run test:run -- --coverage

# Run specific test file
npm test constants.test.ts

# Run tests with UI for debugging
npm run test:ui
```

### CI/CD Integration

```bash
# Run all tests once (suitable for CI)
npm run test:run
```

## Mock Setup

The test setup includes mocks for:

- **`fetch`** - For GitHub API calls
- **`navigator`** - For OS detection testing
- **`console`** - To reduce test noise

## Best Practices

1. **Isolated Tests** - Each test is independent and doesn't rely on external state
2. **Descriptive Names** - Test names clearly describe what is being tested
3. **Edge Cases** - Tests include error conditions and edge cases
4. **Type Safety** - All tests maintain TypeScript type safety
5. **Mocking** - External dependencies are properly mocked

## Future Improvements

1. **Component Integration Tests** - Test actual Astro component rendering
2. **API Integration Tests** - Test with real GitHub API responses
3. **Accessibility Tests** - Validate ARIA attributes and semantic HTML
4. **Performance Tests** - Monitor bundle size and runtime performance
5. **Visual Tests** - Screenshot comparison for UI components
