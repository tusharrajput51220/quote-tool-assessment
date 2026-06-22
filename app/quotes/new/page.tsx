import { getQuoteBuilderData } from "@/lib/catalog/getQuoteBuilderData";

import CreateQuoteForm from "@/components/quote/CreateQuoteForm";

export default async function NewQuotePage() {
  const products = await getQuoteBuilderData();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Create Quote</h1>

      <CreateQuoteForm products={products} />
    </main>
  );
}
