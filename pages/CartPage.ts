import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  private readonly cartHeader = this.page.getByText('Your Cart')
  private readonly checkoutButton = this.page.getByRole('link', { name: 'CHECKOUT' })

  constructor(page: Page) {
    super(page)
  }

  async verifyNavigationToCart() {
    await expect(this.cartHeader).toBeVisible()
  }

  async verifyItemInCart(itemName: string, itemPrice: string) {
    await expect(this.page.getByRole('link', { name: itemName })).toBeVisible()

    // Checking pure price without $ symbols
    const expectedPrice = itemPrice.replace('$', '')
    await expect(this.page.locator('.inventory_item_price')).toHaveText(expectedPrice)
  }

  async navigateToCheckout() {
    await this.checkoutButton.click()
  }
}
