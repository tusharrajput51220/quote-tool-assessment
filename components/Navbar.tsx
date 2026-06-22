import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4">
      <div className="flex gap-6">
        <Link href="/">Home</Link>

        <Link href="/catalog">Catalog</Link>

        <Link href="/quotes/new">New Quote</Link>
      </div>
    </nav>
  );
}
