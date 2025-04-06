import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ItemsPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async verifyNavigationToItemsList() {
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible()
  }

  async addItemToCart(itemIndex: number): Promise<{ name: string; price: string }> {
    const item = this.page.locator('.inventory_item').nth(itemIndex)

    // get item name and price
    const itemName = (await item.locator('.inventory_item_name').textContent()) || ''
    const itemPrice = (await item.locator('.inventory_item_price').textContent()) || ''

    // add that item to cart
    const addButton = item.getByRole('button', { name: 'ADD TO CART' })
    await addButton.click()

    // Verify button label changed to REMOVE
    await expect(item.getByRole('button')).toHaveText('REMOVE')

    // Verify cart badge shows item count
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText('1')

    return { name: itemName, price: itemPrice }
  }

  // forward nav option
  async proceedToCart() {
    await this.page.locator('a.shopping_cart_link').click()
  }
}
