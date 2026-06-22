import { TermLength } from "@prisma/client";
import { TERM_DISCOUNTS } from "./constants";

interface CalculateBasePriceInput {
  seats: number;
  basePrice: number;
  termLength: TermLength;
}

export function calculateBasePrice({
  seats,
  basePrice,
  termLength,
}: CalculateBasePriceInput) {
  const months =
    termLength === "MONTHLY" ? 1 : termLength === "ANNUAL" ? 12 : 24;

  const discountPercent = TERM_DISCOUNTS[termLength];

  const grossAmount = seats * basePrice * months;

  const discountAmount = grossAmount * (discountPercent / 100);

  const finalAmount = grossAmount - discountAmount;

  return {
    months,
    discountPercent,
    grossAmount,
    discountAmount,
    finalAmount,
  };
}
