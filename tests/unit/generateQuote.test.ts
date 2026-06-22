import { describe, expect, it } from "vitest";
import { generateQuote } from "../../lib/pricing/generateQuote";

describe("generateQuote", () => {
  it("matches sample quote spreadsheet", () => {
    const result = generateQuote({
      productName: "Analytics Suite",

      tierName: "Growth",

      seats: 25,

      basePrice: 50,

      termLength: "ANNUAL",

      addons: [
        {
          featureName: "Single Sign-On (SSO)",
          pricingModel: "FIXED",
          price: 200,
        },

        {
          featureName: "API Access",
          pricingModel: "PER_SEAT",
          price: 50,
          quantity: 5,
        },
      ],
    });

    expect(result.total).toBe(18150);

    expect(result.lineItems.length).toBe(3);

    expect(result.lineItems[0].calculation).toContain("25 seats");
  });
});
