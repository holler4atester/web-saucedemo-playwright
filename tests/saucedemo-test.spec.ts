import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.getByPlaceholder('Username');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByText('Products', { exact: true });

  // Add the 3rd in list
  const thirdItem = page.locator('.inventory_item').nth(2);
  const itemName = await thirdItem.locator('.inventory_item_name').textContent() || '';
  const itemPrice = await thirdItem.locator('.inventory_item_price').textContent() || '';
  const addButton = thirdItem.getByRole('button', { name: 'ADD TO CART' });
  await addButton.click();
  
  // button label --> remove
  await expect(thirdItem.getByRole('button')).toHaveText('REMOVE');
  //console.log(itemName);
  //console.log(itemPrice);
  
  // --> progress to cart
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('a.shopping_cart_link').click();
  
  // Check cart summary
  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.getByRole('link', { name: itemName })).toBeVisible();
  await expect(page.getByText('link', { name: itemPrice })).toBeVisible();
  
  // Nav --> checkout
  await page.getByRole('link', { name: 'CHECKOUT' }).click();
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
 
  // TODO: make a function to fill the form
  await page.getByPlaceholder('First Name').fill('holly');
  await page.getByPlaceholder('Last Name').fill('copter');
  await page.getByPlaceholder('Zip/Postal Code').fill('3000');
  await page.getByRole('button', { name: 'CONTINUE' }).click();

  // --> Overview
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  
  // Correct item name and prices
  await expect(page.getByRole('link', { name: itemName })).toBeVisible();
  await expect(page.getByText(itemPrice, { exact: true })).toBeVisible(); 
  
  // Grabbing prices from text fields
  const totalText = await page.locator('.summary_total_label').textContent() || '';
  const totalPrice = parseFloat(totalText.replace(/[^0-9.]/g, ''));
  const itemPriceValue = parseFloat(itemPrice.replace(/[^0-9.]/g, ''));
  
  // Cursory check for total higher than item price
  expect(totalPrice).toBeGreaterThan(itemPriceValue);

  // --> Finish up
  await page.getByRole('link', { name: 'FINISH' }).click();
  await expect(page.getByText('Finish')).toBeVisible();
});
