import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class FinishPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyNavigationToFinish() {
    await expect(this.page.getByText('Finish')).toBeVisible()
  }
}
