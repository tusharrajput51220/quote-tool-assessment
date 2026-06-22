import { z } from "zod";

export const createQuoteSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),

  quoteName: z.string().min(1, "Quote name is required"),

  productId: z.string().min(1, "Product is required"),

  tierId: z.string().min(1, "Tier is required"),

  seats: z.number().int().positive(),

  termLength: z.enum(["MONTHLY", "ANNUAL", "TWO_YEAR"]),

  quoteDiscount: z.number().min(0).max(100).optional(),

  addons: z
    .array(
      z.object({
        featureId: z.string(),

        featureName: z.string(),

        pricingModel: z.enum(["FIXED", "PER_SEAT", "PERCENTAGE"]),

        price: z.number(),

        quantity: z.number().optional(),
      }),
    )
    .default([]),
});
