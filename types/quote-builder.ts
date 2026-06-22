import { getQuoteBuilderData } from "@/lib/catalog/getQuoteBuilderData";

export type QuoteBuilderProducts = Awaited<
  ReturnType<typeof getQuoteBuilderData>
>;
