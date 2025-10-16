import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock fetch for tests
global.fetch = vi.fn();

// Mock navigator for OS detection tests
Object.defineProperty(window, "navigator", {
  value: {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    platform: "Win32",
  },
  writable: true,
});

// Mock console methods to avoid noise in tests
// global.console = {
//   ...console,
//   error: vi.fn(),
//   warn: vi.fn(),
//   log: vi.fn(),
// };
