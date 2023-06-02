module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vitest-globals/env': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:vitest/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: ['./tsconfig.common.json'],
    extraFileExtensions: ['.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
      alias: {
        extensions: ['ts', 'tsx', '.js', '.jsx'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'vitest'],
  rules: {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-empty-pattern': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
};
