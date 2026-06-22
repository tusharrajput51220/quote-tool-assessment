import { prisma } from "@/lib/prisma";

export async function getCatalogs() {
  return prisma.product.findMany({
    include: {
      tiers: true,
      features: true,
    },
  });
}
