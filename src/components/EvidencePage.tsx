
import { useNavigate, useParams } from "react-router-dom";

export default function EvidencePage() {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Evidence: {category?.charAt(0).toUpperCase() + category?.slice(1)}</h2>
      <p className="mb-8 text-gray-600">This is the evidence page for {category}.</p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}
