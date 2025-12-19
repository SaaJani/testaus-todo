import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['cypress/**'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
  },
]);
