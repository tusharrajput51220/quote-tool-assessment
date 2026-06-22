import { v4 as uuid } from "uuid";

import { prisma } from "@/lib/prisma";

import { generateQuote } from "@/lib/pricing/generateQuote";

import { CreateQuoteInput } from "@/types/quote";

export async function createQuote(input: CreateQuoteInput) {
  //   console.log("input", input.tierId);
  const tier = await prisma.tier.findUnique({
    where: {
      id: input.tierId,
    },

    include: {
      product: true,
    },
  });

  if (!tier) {
    throw new Error("Tier not found");
  }

  const pricingResult = generateQuote({
    productName: tier.product.name,

    tierName: tier.name,

    seats: input.seats,

    basePrice: Number(tier.basePrice),

    termLength: input.termLength,

    quoteDiscount: input.quoteDiscount,

    addons: input.addons,
  });

  const publicId = uuid();

  const validUntil = new Date();

  validUntil.setDate(validUntil.getDate() + 30);

  return prisma.$transaction(async (tx) => {
    const quote = await tx.quote.create({
      data: {
        publicId,

        customerName: input.customerName,

        quoteName: input.quoteName,

        validUntil,

        productId: input.productId,

        tierId: input.tierId,

        seats: input.seats,

        termLength: input.termLength,

        quoteDiscount: input.quoteDiscount,

        subtotal: pricingResult.subtotal,

        total: pricingResult.total,
      },
    });

    for (const addon of input.addons) {
      const addonAmount = pricingResult.addonBreakdown.find(
        (item) => item.featureName === addon.featureName,
      );

      await tx.quoteAddon.create({
        data: {
          quoteId: quote.id,

          featureId: addon.featureId,

          quantity: addon.quantity,

          amount: addonAmount?.amount ?? 0,
        },
      });
    }

    for (const item of pricingResult.lineItems) {
      await tx.quoteLineItem.create({
        data: {
          quoteId: quote.id,

          type: item.type,

          title: item.title,

          calculation: item.calculation,

          note: item.note,

          amount: item.amount,
        },
      });
    }

    return quote;
  });
}
