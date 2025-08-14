import { useParams, useNavigate,useSearchParams } from "react-router-dom";
import rawData from "@/data/devices.json";
import { Button } from "@/components/ui/button";




// Adjust the `Device` type to match the raw data structure
export type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
  price: number;
  condition: string;
  warranty: string;
  repairability: string;
  modularity: string;
  lifespan: string;
  buildQuality: string;
  yearofservice?: number;
};


// Map the raw data directly to the `allDevices` list
const allDevices = Object.values(rawData).flat() as Array<Device>;



export default function DeviceDetail({ showStars }: { showStars: boolean }) {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromMainTab = window.location.hash === "#market" ? "market" : "rated";
  const fromTab = searchParams.get(fromMainTab === "market" ? "marketTab" : "ratedTab") || "Laptop";



  if (!category || !id) return <p>Invalid device path.</p>;


  const device = allDevices.find(
    (d) => d.category === category.toLowerCase() && d.id === id
  );

  if (!device) {
    console.warn("🔍 Available devices for debugging:");
    allDevices.forEach((d) =>
      console.warn(`→ category: ${d.category}, id: ${d.id}`)
    );

    return <p className="p-4 text-gray-600">Device not found.</p>;
  }
  

  // Update the DeviceDetail layout to match the logo's aesthetic
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-gradient-to-b from-white to-blue-100">
      {/* Back Button */}
      <Button
        onClick={() => {
            
            console.log("fromMainTab :",fromMainTab)
            console.log("fromTab :",fromTab);

            
             const search = new URLSearchParams();
              search.set(fromMainTab === "market" ? "marketTab" : "ratedTab", fromTab);
              navigate(`/?${search.toString()}#${fromMainTab}`);
          }}
        variant="outline"
        className="mb-4 text-blue-900 border-blue-900"
      >
        ← Back
      </Button>

      {/* Device Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg.avif`}
              type="image/avif"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg`}
              alt={device.name}
              className="w-full rounded-lg object-cover aspect-[4/3] shadow-lg"
            />
          </picture>
        </div>

        {/* Device Info */}
        <div className="flex-grow space-y-4">
          {/* Organize device name, stars, and price into a more elegant layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Device Name */}
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold text-blue-900">{device.name}</h1>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                  device.condition === "Second Hand"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {device.condition}
              </span>
              {device.condition === "Second Hand" && typeof device.yearofservice === "number" && (
                <span className="ml-2 text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 align-middle">
                  {device.yearofservice} yrs used
                </span>
              )}
            </div>

            {/* Price */}
            <p className="text-green-700 text-2xl font-semibold">
              {device.price === 0 ? "Free" : `$${device.price.toFixed(2)}`}
            </p>
          </div>

          {/* Stars */}
          {showStars && device.condition !== "Second Hand" && (
            <div className="flex items-center gap-2">
              <div className="star-rating-container">
                <div
                  className="star-rating-fill"
                  style={{ width: `${(device.star / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-yellow-600 font-medium text-lg">
                ⭐ {device.star} rating
              </p>
            </div>
          )}

          {/* Description Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-blue-900">
              Description
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {device.description}
            </p>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {showStars && device.condition !== "Second Hand" && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src={`${import.meta.env.BASE_URL}images/starrating/${device.star} Stars.png`}
            alt={`${device.star} star rating`}
            className="w-24 h-auto mx-auto drop-shadow-md"
          />
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">
            Sustainability Specifications
          </h2>
     
          <table className="w-full border-collapse text-left">
            <tbody>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Warranty
                </th>
                <td className="border-b p-3">{device.warranty}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Repairability
                </th>
                <td className="border-b p-3">{device.repairability}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Modularity
                </th>
                <td className="border-b p-3">{device.modularity}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Lifespan
                </th>
                <td className="border-b p-3">{device.lifespan}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Build Quality
                </th>
                <td className="border-b p-3">{device.buildQuality}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Product Condition
                </th>
                <td className="border-b p-3">{device.condition}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
