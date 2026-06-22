export interface SelectedQuoteAddon {
  featureId: string;

  featureName: string;

  pricingModel: "FIXED" | "PER_SEAT" | "PERCENTAGE";

  price: number;

  quantity?: number;
}

export interface CreateQuoteInput {
  customerName: string;

  quoteName: string;

  productId: string;

  tierId: string;

  seats: number;

  termLength: "MONTHLY" | "ANNUAL" | "TWO_YEAR";

  quoteDiscount?: number;

  addons: SelectedQuoteAddon[];
}
