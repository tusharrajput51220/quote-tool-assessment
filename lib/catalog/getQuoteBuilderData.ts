import { prisma } from "@/lib/prisma";

export async function getQuoteBuilderData() {
  return prisma.product.findMany({
    include: {
      tiers: {
        include: {
          tierFeatures: {
            include: {
              feature: true,
            },
          },
        },
      },
    },
  });
}
