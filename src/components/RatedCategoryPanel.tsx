import { useState } from "react";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
// import { useNavigate } from "react-router-dom";
import posthog from "posthog-js";
import DeviceCard, { Device } from "@/components/DeviceCard";
import { useNavigate } from "react-router-dom"; // Make sure this is uncommented


interface RatedCategoryPanelProps {
  categoryName: string;
  devices: Device[];
  showStars: boolean;
  cart: Device[];
  addToCart: (device: Device) => void;
  conditionFilter?: "Brand New" | "Second Hand"; 
  fromMainTab: "rated" | "market";
}
export default function RatedCategoryPanel({
  categoryName,
  devices,
  showStars,
  cart,
  addToCart,
  conditionFilter,
  fromMainTab
}: RatedCategoryPanelProps) 
 {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [minStars, setMinStars] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const filtered = devices.filter(
    (d) =>
      (!conditionFilter || d.condition === conditionFilter) &&
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      d.star >= minStars &&
      d.price <= maxPrice
  );
  const addToCartAndPersist = (device: Device) => {
    const newCart = [...cart, device];
    addToCart(device); // 更新 React 状态
    localStorage.setItem("cart", JSON.stringify(newCart)); // 同步本地存储
  };

  const navigate = useNavigate();

  const handleCardClick = (device: Device) => {
  posthog.capture("clicked_device_card", {
    name: device.name,
    category: device.category,
    star: device.star,
  });

  const tabKey = fromMainTab === "market" ? "marketTab" : "ratedTab";
  const params = new URLSearchParams({ [tabKey]: categoryName });

  navigate(`/devices/${device.category}/${device.id}?${params.toString()}#${fromMainTab}`);
};


  return (
    <div className="relative">
      {/* Cart Display */}
      {/* <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
        <h3 className="text-lg font-semibold mb-2">Cart</h3>
        {cart.length > 0 ? (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm text-green-700">
                  {item.condition === "Second Hand"
                    ? "Free"
                    : `$${item.price.toFixed(2)}`}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}
      </div> */}

      {/* Filters */}
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Label>Search:</Label>
          <Input
            className="w-64"
            value={search}
            placeholder="Enter device name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label>Max Price:</Label>
          <Input
            type="number"
            className="w-32"
            placeholder="No limit"
            onChange={(e) => {
              const input = e.target.value;
              const value = Number(input);

              if (input.trim() === "") {
                setMaxPrice(Infinity); 
              } else if (!isNaN(value)) {
                setMaxPrice(value); 
              }
            }}
          />
        </div>

        {showStars && (
          <div className="flex items-center gap-2">
            <Label>Min Stars:</Label>
            <select
              title="Filter by minimum stars"
              className="border px-2 py-1 border-gray-500"
              value={minStars}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinStars(value);
                posthog.capture("used_star_filter", { star: value });
              }}
            >
              <option value={0}>All</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5 only</option>
            </select>
          </div>
        )}
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map((device, i) => (
          <DeviceCard
            key={i}
            device={device}
            showStars={showStars}
            onAddToCart={addToCartAndPersist}
            onDetail={() => handleCardClick(device)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">
          No matching devices found in {categoryName}.
        </p>
      )}
    </div>
  );
}
