import { describe, expect, it } from "vitest";
import { calculateQuoteDiscount } from "../../lib/pricing/calculateQuoteDiscount";
// import { calculateQuoteDiscount } from "@/lib/pricing/calculateQuoteDiscount";

describe("calculateQuoteDiscount", () => {
  it("applies quote discount", () => {
    const result = calculateQuoteDiscount({
      subtotal: 10000,
      discountPercent: 10,
    });

    expect(result.discountAmount).toBe(1000);

    expect(result.total).toBe(9000);
  });

  it("works without discount", () => {
    const result = calculateQuoteDiscount({
      subtotal: 10000,
    });

    expect(result.total).toBe(10000);
  });
});
