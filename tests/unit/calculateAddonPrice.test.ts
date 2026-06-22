import { describe, expect, it } from "vitest";
// import { calculateAddonPrice } from "@/lib/pricing/calculateAddonPrice";
import { calculateAddonPrice } from "../../lib/pricing/calculateAddonPrice";

describe("calculateAddonPrice", () => {
  it("calculates fixed addon", () => {
    const result = calculateAddonPrice({
      pricingModel: "FIXED",
      price: 200,
      months: 12,
    });

    expect(result).toBe(2400);
  });

  it("calculates per seat addon", () => {
    const result = calculateAddonPrice({
      pricingModel: "PER_SEAT",
      price: 50,
      quantity: 5,
      months: 12,
    });

    expect(result).toBe(3000);
  });

  it("calculates percentage addon", () => {
    const result = calculateAddonPrice({
      pricingModel: "PERCENTAGE",
      price: 10,
      productAmount: 12750,
      months: 12,
    });

    expect(result).toBe(1275);
  });
});
