import { PricingModel } from "@prisma/client";

interface CalculateAddonPriceInput {
  pricingModel: PricingModel;

  price: number;

  months: number;

  quantity?: number;

  productAmount?: number;
}

export interface SelectedAddon {
  featureName: string;

  pricingModel: PricingModel;

  price: number;

  quantity?: number;
}

export function calculateAddonPrice({
  pricingModel,
  price,
  months,
  quantity,
  productAmount,
}: CalculateAddonPriceInput): number {
  switch (pricingModel) {
    case "FIXED":
      return price * months;

    case "PER_SEAT":
      return price * (quantity ?? 0) * months;

    case "PERCENTAGE":
      return (productAmount ?? 0) * (price / 100);

    default:
      return 0;
  }
}
