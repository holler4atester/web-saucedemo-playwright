import { test } from '@playwright/test'
import {
  LoginPage,
  ItemsPage,
  CartPage,
  CheckoutPage,
  CheckoutOverviewPage,
  FinishPage,
} from '../pages'

test(
  'Select and purchase an item on Sauce Demo web',
  {
    tag: '@smoke',
    annotation: { type: 'smoke test' },
  },
  async ({ page }) => {
    const loginPage = new LoginPage(page)
    const itemsPage = new ItemsPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    const finishPage = new FinishPage(page)

    await test.step('Login to Sauce Demo', async () => {
      await loginPage.navigate()
      await loginPage.login('standard_user', 'secret_sauce')
      await itemsPage.verifyNavigationToItemsList()
    })

    // Select actual random index, later? --> item to cart
    let itemName, itemPrice
    await test.step('Add 3rd item to cart', async () => {
      const result = await itemsPage.addItemToCart(2)
      itemName = result.name
      itemPrice = result.price
    })

    await test.step('Verify same item appears in cart', async () => {
      await itemsPage.proceedToCart()
      await cartPage.verifyNavigationToCart()
      await cartPage.verifyItemInCart(itemName, itemPrice)
    })

    await test.step('Complete checkout information and go to checkout', async () => {
      await cartPage.proceedToCheckout()
      await checkoutPage.verifyNavigationToCheckout()
      await checkoutPage.fillForm('Holler4a', 'Tester', '3000')
      await checkoutPage.proceedToCheckout()
    })

    await test.step('Verify checkout overview and complete order', async () => {
      await checkoutOverviewPage.verifyNavigationToCheckoutOverview()
      await checkoutOverviewPage.verifyItemInCheckout(itemName, itemPrice)
      await checkoutOverviewPage.verifyTotalGreaterThanItemPrice(itemPrice)
      await checkoutOverviewPage.completeOrder()
    })

    await test.step('Complete order and verify order completion', async () => {
      await finishPage.verifyNavigationToFinish()
    })
  },
)
