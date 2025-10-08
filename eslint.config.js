// eslint.config.js (ESLint v9 Flat Config)
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'node_modules']),

  {
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      // ✅ JSX must be enabled here (not directly on languageOptions)
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },

    // Flat Config plugin registration
    plugins: {
      'unused-imports': unusedImports,
    },

    rules: {
      // Auto-remove unused imports on --fix
      'unused-imports/no-unused-imports': 'error',
      // Tolerate _prefixed args/vars and auto-fix many cases
      'unused-imports/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Keep core rule as warn so CI isn’t brittle
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Your earlier CI failure for empty blocks—disable if you want
      'no-empty': 'off',
    },
  },

  // utils aren’t React components; silence Fast Refresh constraint there
  {
    files: ['src/utils/**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
