// ESLint flat config for React + Vite
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: true,
        document: true,
        navigator: true,
        performance: true,
        localStorage: true,
        console: true,
        IntersectionObserver: true,
        process: true,
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-empty': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
];


