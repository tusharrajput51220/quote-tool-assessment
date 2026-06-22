import { prisma } from "@/lib/prisma";

export async function getQuoteByPublicId(publicId: string) {
  return prisma.quote.findUnique({
    where: {
      publicId,
    },

    include: {
      product: true,

      tier: true,

      addons: {
        include: {
          feature: true,
        },
      },

      lineItems: true,
    },
  });
}
