"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  products: any[];
}

export default function CreateQuoteForm({ products }: Props) {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");

  const [quoteName, setQuoteName] = useState("");

  const [productId, setProductId] = useState("");

  const [tierId, setTierId] = useState("");

  const [seats, setSeats] = useState(1);

  const [termLength, setTermLength] = useState("MONTHLY");

  const [quoteDiscount, setQuoteDiscount] = useState(0);

  const selectedProduct = products.find((p) => p.id === productId);

  const selectedTier = selectedProduct?.tiers.find((t: any) => t.id === tierId);

  const availableAddons =
    selectedTier?.tierFeatures.filter((f: any) => f.availability === "ADDON") ??
    [];

  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

  const [addonQuantities, setAddonQuantities] = useState<
    Record<string, number>
  >({});

  async function handleSubmit() {
    const payload = {
      customerName,
      quoteName,
      productId,
      tierId,
      seats,
      termLength,
      quoteDiscount,
      addons: selectedAddons.map((addon) => ({
        ...addon,

        quantity:
          addon.pricingModel === "PER_SEAT"
            ? addonQuantities[addon.featureId] || 1
            : undefined,
      })),
    };

    const response = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    router.push(`/quote/${data.publicId}`);
  }

  return (
    <div className="space-y-6">
      <input
        className="w-full border p-2"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        className="w-full border p-2"
        placeholder="Quote Name"
        value={quoteName}
        onChange={(e) => setQuoteName(e.target.value)}
      />

      <select
        className="w-full border p-2"
        value={productId}
        onChange={(e) => {
          setProductId(e.target.value);

          setTierId("");
        }}
      >
        <option value="">Select Product</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border p-2"
        value={tierId}
        onChange={(e) => setTierId(e.target.value)}
      >
        <option value="">Select Tier</option>

        {selectedProduct?.tiers.map((tier: any) => (
          <option key={tier.id} value={tier.id}>
            {tier.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full border p-2"
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
      />

      <select
        className="w-full border p-2"
        value={termLength}
        onChange={(e) => setTermLength(e.target.value)}
      >
        <option value="MONTHLY">Monthly</option>

        <option value="ANNUAL">Annual</option>

        <option value="TWO_YEAR">Two Year</option>
      </select>

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Discount %"
        value={quoteDiscount}
        onChange={(e) => setQuoteDiscount(Number(e.target.value))}
      />

      <div>
        <h3 className="mb-2 font-semibold">Available Add-ons</h3>

        {availableAddons.map((addon: any) => (
          <div key={addon.id} className="mb-4 rounded border p-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAddons((prev) => [
                      ...prev,
                      {
                        featureId: addon.feature.id,

                        featureName: addon.feature.name,

                        pricingModel: addon.pricingModel,

                        price: Number(addon.price),

                        quantity:
                          addon.pricingModel === "PER_SEAT"
                            ? addonQuantities[addon.feature.id] || 1
                            : undefined,
                      },
                    ]);
                  } else {
                    setSelectedAddons((prev) =>
                      prev.filter(
                        (item) => item.featureId !== addon.feature.id,
                      ),
                    );
                  }
                }}
              />

              <span>{addon.feature.name}</span>
            </label>

            {addon.pricingModel === "PER_SEAT" && (
              <div className="mt-2">
                <input
                  type="number"
                  min={1}
                  placeholder="Addon Seats"
                  className="border p-2"
                  value={addonQuantities[addon.feature.id] || ""}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    setAddonQuantities((prev) => ({
                      ...prev,
                      [addon.feature.id]: value,
                    }));
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Quote
      </button>
    </div>
  );
}
