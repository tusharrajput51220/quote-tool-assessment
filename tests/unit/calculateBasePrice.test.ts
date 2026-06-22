import { describe, expect, it } from "vitest";
import { calculateBasePrice } from "../../lib/pricing/calculateBasePrice";
// import { calculateBasePrice } from "@/lib/pricing/calculateBasePrice";

describe("calculateBasePrice", () => {
  it("calculates annual pricing correctly", () => {
    const result = calculateBasePrice({
      seats: 25,
      basePrice: 50,
      termLength: "ANNUAL",
    });

    expect(result.grossAmount).toBe(15000);

    expect(result.discountAmount).toBe(2250);

    expect(result.finalAmount).toBe(12750);
  });

  it("calculates monthly pricing correctly", () => {
    const result = calculateBasePrice({
      seats: 25,
      basePrice: 50,
      termLength: "MONTHLY",
    });

    expect(result.finalAmount).toBe(1250);
  });

  it("calculates two year pricing correctly", () => {
    const result = calculateBasePrice({
      seats: 25,
      basePrice: 50,
      termLength: "TWO_YEAR",
    });

    expect(result.finalAmount).toBe(22500);
  });
});
