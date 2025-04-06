import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton = this.page.getByRole('link', { name: 'FINISH' })

  constructor(page: Page) {
    super(page)
  }

  async verifyNavigationToCheckoutOverview() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible()
  }

  async verifyItemInCheckout(itemName: string, itemPrice: string) {
    await expect(this.page.getByRole('link', { name: itemName })).toBeVisible()
    await expect(this.page.getByText(itemPrice, { exact: true })).toBeVisible()
  }

  // getting total price
  async getTotalPrice(): Promise<number> {
    const totalText = (await this.page.locator('.summary_total_label').textContent()) || ''
    return parseFloat(totalText.replace(/[^0-9.]/g, ''))
  }

  // check total price is higher than item price
  async verifyTotalGreaterThanItemPrice(itemPrice: string) {
    const totalPrice = await this.getTotalPrice()
    const itemPriceValue = parseFloat(itemPrice.replace(/[^0-9.]/g, ''))
    expect(totalPrice).toBeGreaterThan(itemPriceValue)
  }

  // progress to completion
  async completeOrder() {
    await this.finishButton.click()
  }
}
