import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByPlaceholder('Username')
  private readonly passwordInput = this.page.getByPlaceholder('Password')
  private readonly loginButton = this.page.getByRole('button', { name: 'LOGIN' })

  constructor(page: Page) {
    super(page)
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
