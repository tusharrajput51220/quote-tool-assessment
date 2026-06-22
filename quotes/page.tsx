import { getQuoteBuilderData } from "@/lib/catalog/getQuoteBuilderData";

export default async function NewQuotePage() {
  const products = await getQuoteBuilderData();

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Create Quote</h1>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}
