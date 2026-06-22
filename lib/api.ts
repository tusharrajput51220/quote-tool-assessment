export async function getCatalogs() {
  const res = await fetch("http://localhost:3000/api/catalog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch catalogs");
  }

  return res.json();
}
