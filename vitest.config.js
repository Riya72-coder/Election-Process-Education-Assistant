import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Automatically inject React into every JSX/TSX file processed by the
    // test runner. This mirrors how Vite handles JSX in development, where
    // the @vitejs/plugin-react plugin handles the import automatically.
    jsxInject: `import React from 'react'`,
  },
  test: {
    // Simulate a browser environment (window, document, etc.)
    environment: 'jsdom',
    // Run this file before every test file to extend expect() with jest-dom matchers
    setupFiles: ['./src/test/setup.js'],
    // Allow global vitest APIs (describe, it, expect) without importing them
    globals: true,
  },
});
