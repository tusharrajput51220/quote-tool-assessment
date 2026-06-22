import { prisma } from "@/lib/prisma";

export async function getCatalogById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      tiers: {
        orderBy: {
          basePrice: "asc",
        },
      },

      features: {
        include: {
          tierFeatures: {
            include: {
              tier: true,
            },
          },
        },
      },
    },
  });
}
