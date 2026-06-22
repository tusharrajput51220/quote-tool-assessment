import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">Monetizely Quote Tool</h1>

      <div className="mt-8 flex gap-4">
        <Link href="/catalog" className="rounded bg-black px-4 py-2 text-white">
          Catalog
        </Link>

        <Link
          href="/quotes/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          New Quote
        </Link>
      </div>
    </main>
  );
}
