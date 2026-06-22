interface Input {
  subtotal: number;
  discountPercent?: number;
}

export function calculateQuoteDiscount({ subtotal, discountPercent }: Input) {
  if (!discountPercent) {
    return {
      discountAmount: 0,
      total: subtotal,
    };
  }

  const discountAmount = subtotal * (discountPercent / 100);

  return {
    discountAmount,
    total: subtotal - discountAmount,
  };
}
