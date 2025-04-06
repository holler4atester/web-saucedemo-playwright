import playwright from 'eslint-plugin-playwright'

export default [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    'no-console': 'error',
    'playwright/no-invalid-role-arguments': 'error',
    'playwright/no-invalid-locator-arguments': 'error',
    'playwright/no-invalid-expect-arguments': 'error',
    'playwright/no-invalid-expect-message': 'error',
    'playwright/no-invalid-expect-type': 'error',
      'playwright/no-invalid-expect-value': 'error'
    }
  }
]
