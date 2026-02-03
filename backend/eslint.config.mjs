import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  js.configs.recommended,
]);
