import { notFound } from "next/navigation";

import { getQuoteByPublicId } from "@/lib/quote/getQuoteByPublicId";
import { formatTermLength } from "@/lib/formatters/formatTermLength";

interface PageProps {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function QuotePage({ params }: PageProps) {
  const { publicId } = await params;

  const quote = await getQuoteByPublicId(publicId);

  if (!quote) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-4xl font-bold">{quote.quoteName}</h1>

      {/* Quote Details */}

      <section className="mb-10 rounded border p-6">
        <h2 className="mb-4 text-2xl font-semibold">Quote Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Customer:</strong> {quote.customerName}
          </div>

          <div>
            <strong>Quote Name:</strong> {quote.quoteName}
          </div>

          <div>
            <strong>Quote Date:</strong>{" "}
            {new Date(quote.createdAt).toLocaleDateString()}
          </div>

          <div>
            <strong>Valid Until:</strong>{" "}
            {new Date(quote.validUntil).toLocaleDateString()}
          </div>
        </div>
      </section>

      {/* Purchase Summary */}

      <section className="mb-10 rounded border p-6">
        <h2 className="mb-4 text-2xl font-semibold">What Is Being Purchased</h2>

        <div className="space-y-2">
          <p>
            <strong>Product:</strong> {quote.product.name}
          </p>

          <p>
            <strong>Tier:</strong> {quote.tier.name}
          </p>

          <p>
            <strong>Seats:</strong> {quote.seats}
          </p>

          <p>
            <strong>Term Length:</strong> {formatTermLength(quote.termLength)}
          </p>
        </div>
      </section>

      {/* Cost Breakdown */}

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Cost Breakdown</h2>

        <div className="overflow-hidden rounded border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3 text-left">Line Item</th>

                <th className="p-3 text-left">How It Was Calculated</th>

                <th className="p-3 text-left">Notes</th>

                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {quote.lineItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.title}</td>

                  <td className="p-3">{item.calculation}</td>

                  <td className="p-3">{item.note}</td>

                  <td className="p-3 text-right">
                    ${Number(item.amount).toLocaleString()}
                  </td>
                </tr>
              ))}

              <tr className="bg-gray-50 font-bold">
                <td colSpan={3} className="p-4 text-right">
                  TOTAL
                </td>

                <td className="p-4 text-right">
                  ${Number(quote.total).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
