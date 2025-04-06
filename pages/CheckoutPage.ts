import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.page.getByPlaceholder('First Name')
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name')
  private readonly postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code')
  private readonly continueButton = this.page.getByRole('button', { name: 'CONTINUE' })

  constructor(page: Page) {
    super(page)
  }

  async verifyNavigationToCheckout() {
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible()
  }

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async proceedToCheckout() {
    await this.continueButton.click()
  }
}
