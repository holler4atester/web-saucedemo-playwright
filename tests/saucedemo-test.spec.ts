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

    // Login
    await loginPage.navigate()
    await loginPage.login('standard_user', 'secret_sauce')
    await itemsPage.verifyNavigationToItemsList()

    // Add 3rd (or random, later?) item to cart
    const { name: itemName, price: itemPrice } = await itemsPage.addItemToCart(2)

    // Verify same item appears in cart
    await itemsPage.navigateToCart()
    await cartPage.verifyNavigationToCart()
    await cartPage.verifyItemInCart(itemName, itemPrice)

    // Go to checkout
    await cartPage.navigateToCheckout()
    await checkoutPage.verifyNavigationToCheckout()
    await checkoutPage.fillForm('Holler4a', 'Tester', '3000')

    // Review before completing
    await checkoutOverviewPage.verifyNavigationToCheckoutOverview()
    await checkoutOverviewPage.verifyItemInCheckout(itemName, itemPrice)
    await checkoutOverviewPage.verifyTotalGreaterThanItemPrice(itemPrice)
    await checkoutOverviewPage.completeOrder()

    // Finish
    await finishPage.verifyNavigationToFinish()
  },
)
