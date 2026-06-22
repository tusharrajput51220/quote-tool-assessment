import { FeatureAvailability, PricingModel } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { CreateCatalogInput } from "@/types/catalog";

export async function createCatalog(data: CreateCatalogInput) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name: data.productName,
      },
    });

    const tierMap = new Map<string, string>();

    for (const tier of data.tiers) {
      const createdTier = await tx.tier.create({
        data: {
          name: tier.name,
          basePrice: tier.basePrice,
          productId: product.id,
        },
      });

      tierMap.set(tier.name, createdTier.id);
    }

    for (const feature of data.features) {
      const createdFeature = await tx.feature.create({
        data: {
          name: feature.name,
          productId: product.id,
        },
      });

      for (const config of feature.tierConfigs) {
        const tierId = tierMap.get(config.tierName);

        if (!tierId) continue;

        await tx.tierFeature.create({
          data: {
            tierId,

            featureId: createdFeature.id,

            availability: config.availability as FeatureAvailability,

            pricingModel: config.pricingModel
              ? (config.pricingModel as PricingModel)
              : null,

            price: config.price ?? null,
          },
        });
      }
    }

    return product;
  });
}
