import { getCatalogs } from "@/lib/api";
import Link from "next/link";

export default async function CatalogPage() {
  const catalogs = await getCatalogs();

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Catalogs</h1>

      <div className="space-y-4">
        {catalogs.map((catalog: any) => (
          <Link
            href={`/catalog/${catalog.id}`}
            className="block rounded border p-4 hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{catalog.name}</h2>

            <p>Tiers: {catalog.tiers.length}</p>

            <p>Features: {catalog.features.length}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
