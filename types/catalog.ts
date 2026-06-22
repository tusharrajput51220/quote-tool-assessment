export interface TierInput {
  name: string;
  basePrice: number;
}

export interface FeatureTierConfigInput {
  tierName: string;

  availability: "INCLUDED" | "ADDON" | "NOT_AVAILABLE";

  pricingModel?: "FIXED" | "PER_SEAT" | "PERCENTAGE";

  price?: number;
}

export interface FeatureInput {
  name: string;

  tierConfigs: FeatureTierConfigInput[];
}

export interface CreateCatalogInput {
  productName: string;

  tiers: TierInput[];

  features: FeatureInput[];
}
