import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/tax");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("textbox", { name: "Nafn" }).click();
  await page.getByRole("textbox", { name: "Nafn" }).fill("Baha eddine");
  await page.getByRole("textbox", { name: "Nafn" }).press("Tab");
  await page.getByRole("textbox", { name: "Kennitala" }).fill("1235646");
  await page.getByRole("textbox", { name: "Símanúmer" }).click();
  await page.getByRole("textbox", { name: "Símanúmer" }).fill("5626597");
  await page.getByRole("textbox", { name: "Símanúmer" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Netfang" })
    .fill("baha@vikonnekt.com");
  await page.getByRole("textbox", { name: "Netfang" }).press("Tab");
  await page.getByRole("textbox", { name: "Heimilisfang" }).fill("Baha");
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("textbox", { name: "Kennitala" }).fill("1235646564");
  await page.getByRole("textbox", { name: "Heimilisfang" }).click();
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("textbox", { name: "Heimilisfang" }).click();
  await page.getByRole("textbox", { name: "Heimilisfang" }).fill("55555");
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.locator('input[name="incomeItems\\.0\\.amount"]').click();
  await page.locator('input[name="incomeItems\\.0\\.amount"]').fill("936000");
  await page.locator('input[name="incomeItems\\.1\\.amount"]').click();
  await page.locator('input[name="incomeItems\\.1\\.amount"]').fill("900000");
  await page.locator('[id="subsidyItems\\.0\\.amount"]').click();
  await page.locator('[id="subsidyItems\\.0\\.amount"]').fill("900000");
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.locator('[id="vehicles\\.0\\.kaupverd"]').click();
  await page.locator('[id="vehicles\\.0\\.kaupverd"]').click();
  await page.locator('[id="vehicles\\.0\\.kaupverd"]').fill("3100000");
  await page.locator('[id="vehicles\\.1\\.kaupverd"]').click();
  await page.locator('[id="vehicles\\.1\\.kaupverd"]').fill("430000");
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("textbox", { name: "Fasteignamat" }).fill("5200000");
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("textbox", { name: "Vextir" }).click();
  await page.getByRole("textbox", { name: "Vextir" }).fill("1200000");
  await page.getByRole("textbox", { name: "Dagsetning" }).click();
  await page
    .getByRole("option", { name: "Choose miðvikudagur, 7. maí" })
    .click();
  await page.getByRole("button", { name: "Áfram" }).click();
  await page.getByRole("button", { name: "Áfram" }).click();
});
