import { test, expect } from "@playwright/test";

test("create quote flow", async ({ page }) => {
  await page.goto("/quotes/new");

  await page.getByPlaceholder("Customer Name").fill("Acme Corporation");

  await page
    .getByPlaceholder("Quote Name")
    .fill("Acme Corp - Q3 2026 Proposal");

  await page.screenshot({
    path: "screenshots/form.png",
  });

  await expect(page).toHaveURL(/quotes\/new/);
});
