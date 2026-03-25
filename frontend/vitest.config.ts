import path from 'path';

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const hasUI = process.argv.includes('ui') || process.argv.includes('--ui');

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    pool: 'forks',
    globals: true,
    ui: hasUI,
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 10000,
    hookTimeout: 10000,
    reporters: [
      'default',
      ['junit', { outputFile: 'coverage/junit-report.xml' }],
    ],
    exclude: [
      '@src//assets/**',
      '**/node_modules/**',
      'dist/**',
      'coverage/**',
    ],
    server: {},
    coverage: {
      provider: 'istanbul',
      exclude: [
        '@assets/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.d.ts',
        '**/*.types.ts',
        '**/*.constants.ts',
        '**/*.scss',
        '**/*.css',
        '**/*.json',
      ],
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'json', 'html', 'cobertura'],
    },
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
