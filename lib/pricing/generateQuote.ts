import { PricingModel, TermLength, LineItemType } from "@prisma/client";

import { calculateAddonPrice } from "./calculateAddonPrice";
import { calculateBasePrice } from "./calculateBasePrice";
import { calculateQuoteDiscount } from "./calculateQuoteDiscount";

export interface SelectedAddon {
  featureName: string;
  pricingModel: PricingModel;
  price: number;
  quantity?: number;
}

interface GenerateQuoteInput {
  productName: string;
  tierName: string;

  seats: number;

  basePrice: number;

  termLength: TermLength;

  quoteDiscount?: number;

  addons: SelectedAddon[];
}

export function generateQuote(input: GenerateQuoteInput) {
  const baseResult = calculateBasePrice({
    seats: input.seats,
    basePrice: input.basePrice,
    termLength: input.termLength,
  });

  const lineItems: {
    type: LineItemType;
    title: string;
    calculation: string;
    note: string;
    amount: number;
  }[] = [];

  const addonBreakdown: {
    featureName: string;
    amount: number;
  }[] = [];

  lineItems.push({
    type: LineItemType.BASE_PRODUCT,

    title: `${input.productName} - ${input.tierName} Tier`,

    calculation: `${input.seats} seats × $${input.basePrice} × ${baseResult.months} months × (1 - ${baseResult.discountPercent}%)`,

    note: "Base product cost",

    amount: baseResult.finalAmount,
  });

  let subtotal = baseResult.finalAmount;

  for (const addon of input.addons) {
    const addonAmount = calculateAddonPrice({
      pricingModel: addon.pricingModel,
      price: addon.price,
      quantity: addon.quantity,
      months: baseResult.months,
      productAmount: baseResult.finalAmount,
    });

    let calculation = "";
    let note = "";

    switch (addon.pricingModel) {
      case PricingModel.FIXED:
        calculation = `$${addon.price} per month × ${baseResult.months} months`;
        note = "Fixed monthly add-on";
        break;

      case PricingModel.PER_SEAT:
        calculation = `${addon.quantity} seats × $${addon.price} × ${baseResult.months} months`;
        note = "Per-seat add-on";
        break;

      case PricingModel.PERCENTAGE:
        calculation = `${addon.price}% × $${baseResult.finalAmount}`;
        note = "Percentage of product price";
        break;
    }

    subtotal += addonAmount;

    const calculatedAddon = {
      featureName: addon.featureName,
      amount: addonAmount,
    };

    addonBreakdown.push(calculatedAddon);

    lineItems.push({
      type: LineItemType.ADDON,
      title: addon.featureName,
      calculation,
      note,
      amount: addonAmount,
    });
  }

  const discountResult = calculateQuoteDiscount({
    subtotal,
    discountPercent: input.quoteDiscount,
  });

  if (discountResult.discountAmount > 0) {
    lineItems.push({
      type: LineItemType.DISCOUNT,
      title: "Quote Discount",
      calculation: `${input.quoteDiscount}% of $${subtotal}`,
      note: "Overall quote discount",
      amount: -discountResult.discountAmount,
    });
  }

  return {
    subtotal,
    total: discountResult.total,
    lineItems,
    addonBreakdown,
  };
}
