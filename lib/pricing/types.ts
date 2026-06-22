export interface GeneratedLineItem {
  type: "BASE_PRODUCT" | "ADDON" | "DISCOUNT";

  title: string;

  calculation: string;

  note?: string;

  amount: number;
}
