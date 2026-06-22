import { test, expect } from "@playwright/test";

test("create and view quote", async ({ page }) => {
  await page.goto("/quotes/new");

  await page.getByPlaceholder("Customer Name").fill("Acme Corporation");

  await page
    .getByPlaceholder("Quote Name")
    .fill("Acme Corp - Q3 2026 Proposal");

  // Product

  await page.locator("select").nth(0).selectOption({
    label: "Analytics Suite",
  });

  // Tier

  await page.locator("select").nth(1).selectOption({
    label: "Growth",
  });

  // Seats

  await page.locator('input[type="number"]').first().fill("25");

  // Term

  await page.locator("select").nth(2).selectOption({
    label: "Annual",
  });

  // SSO

  await page.getByText("Single Sign-On (SSO)").click();

  // Submit

  await page
    .getByRole("button", {
      name: /create quote/i,
    })
    .click();

  // Redirect

  await expect(page).toHaveURL(/\/quote\//);

  // Verify quote page

  await expect(page.getByText("Acme Corporation")).toBeVisible();

  await expect(page.getByText("Product: Analytics Suite")).toBeVisible();

  await expect(page.getByText("Tier: Growth")).toBeVisible();

  await expect(page.getByText("TOTAL")).toBeVisible();
});
