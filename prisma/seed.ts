import {
  PrismaClient,
  FeatureAvailability,
  PricingModel,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.quoteAddon.deleteMany();
  await prisma.quoteLineItem.deleteMany();
  await prisma.quote.deleteMany();

  await prisma.tierFeature.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.tier.deleteMany();
  await prisma.product.deleteMany();

  const product = await prisma.product.create({
    data: {
      name: "Analytics Suite",
    },
  });

  const starterTier = await prisma.tier.create({
    data: {
      name: "Starter",
      basePrice: 25,
      productId: product.id,
    },
  });

  const growthTier = await prisma.tier.create({
    data: {
      name: "Growth",
      basePrice: 50,
      productId: product.id,
    },
  });

  const enterpriseTier = await prisma.tier.create({
    data: {
      name: "Enterprise",
      basePrice: 100,
      productId: product.id,
    },
  });

  const sso = await prisma.feature.create({
    data: {
      name: "Single Sign-On (SSO)",
      productId: product.id,
    },
  });

  const apiAccess = await prisma.feature.create({
    data: {
      name: "API Access",
      productId: product.id,
    },
  });

  const auditLogs = await prisma.feature.create({
    data: {
      name: "Audit Logs",
      productId: product.id,
    },
  });

  const reports = await prisma.feature.create({
    data: {
      name: "Advanced Reports",
      productId: product.id,
    },
  });

  // ========================
  // SSO
  // ========================

  await prisma.tierFeature.create({
    data: {
      tierId: starterTier.id,
      featureId: sso.id,
      availability: FeatureAvailability.NOT_AVAILABLE,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: growthTier.id,
      featureId: sso.id,
      availability: FeatureAvailability.ADDON,
      pricingModel: PricingModel.FIXED,
      price: 200,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: enterpriseTier.id,
      featureId: sso.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  // ========================
  // API ACCESS
  // ========================

  await prisma.tierFeature.create({
    data: {
      tierId: starterTier.id,
      featureId: apiAccess.id,
      availability: FeatureAvailability.NOT_AVAILABLE,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: growthTier.id,
      featureId: apiAccess.id,
      availability: FeatureAvailability.ADDON,
      pricingModel: PricingModel.PER_SEAT,
      price: 50,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: enterpriseTier.id,
      featureId: apiAccess.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  // ========================
  // AUDIT LOGS
  // ========================

  await prisma.tierFeature.create({
    data: {
      tierId: starterTier.id,
      featureId: auditLogs.id,
      availability: FeatureAvailability.ADDON,
      pricingModel: PricingModel.PERCENTAGE,
      price: 10,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: growthTier.id,
      featureId: auditLogs.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: enterpriseTier.id,
      featureId: auditLogs.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  // ========================
  // REPORTS
  // ========================

  await prisma.tierFeature.create({
    data: {
      tierId: starterTier.id,
      featureId: reports.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: growthTier.id,
      featureId: reports.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  await prisma.tierFeature.create({
    data: {
      tierId: enterpriseTier.id,
      featureId: reports.id,
      availability: FeatureAvailability.INCLUDED,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
