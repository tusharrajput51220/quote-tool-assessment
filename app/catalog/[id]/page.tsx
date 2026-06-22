import { notFound } from "next/navigation";

import { getCatalogById } from "@/lib/catalog/getCatalogById";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CatalogDetailPage({ params }: PageProps) {
  const { id } = await params;

  const catalog = await getCatalogById(id);

  if (!catalog) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">{catalog.name}</h1>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Tiers</h2>

        <div className="space-y-3">
          {catalog.tiers.map((tier) => (
            <div key={tier.id} className="rounded border p-4">
              <div className="font-medium">{tier.name}</div>

              <div>
                ${Number(tier.basePrice)}
                /seat/month
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Features</h2>

        <div className="space-y-6">
          {catalog.features.map((feature) => (
            <div key={feature.id} className="rounded border p-4">
              <h3 className="mb-3 text-lg font-semibold">{feature.name}</h3>

              <div className="space-y-2">
                {feature.tierFeatures.map((mapping) => (
                  <div key={mapping.id} className="flex justify-between">
                    <span>{mapping.tier.name}</span>

                    <span>
                      {mapping.availability}

                      {mapping.price && ` ($${Number(mapping.price)})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
