// ✅ Main Page;
import { useNavigate } from "react-router-dom";
export default function SampleAuditorPage({
  onLogout,
}: {
  onLogout: () => void;
}) {


  // 各区块进度值（可根据实际情况动态设置）
  const blocks = [
    { label: "Privacy", color: "bg-green-100 border-green-400", bar: "bg-green-500", progress: 100, key: "privacy" },
    { label: "Transparency", color: "bg-blue-100 border-blue-400", bar: "bg-blue-500", progress: 80, key: "transparency" },
    { label: "Sustainability", color: "bg-yellow-100 border-yellow-400", bar: "bg-yellow-500", progress: 60, key: "sustainability" },
  ];

  const totalPoints = blocks.length * 100;
  const totalProgress = Math.round(
    (blocks.reduce((sum, b) => sum + b.progress, 0) / totalPoints) * 100
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center bg-gradient-to-b from-white to-blue-100">
      <div className="w-full flex justify-start">
        <button
          onClick={onLogout}
          className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-900">
        FOR HUMANITY
      </h1>

      {/* Auditor Overview 总体进度条 */}
      <div className="w-full max-w-5xl my-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-900">Auditor Overview</h2>
        <div className="w-full bg-gray-200 rounded-full h-5 mb-2">
          <div
            className="bg-blue-600 h-5 rounded-full"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <div className="flex justify-end text-sm font-semibold text-gray-700 mb-2">{totalProgress}%</div>
      </div>

      <div className="w-full max-w-5xl my-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Audit Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blocks.map(({ label, color, bar, progress, key }) => (
            <div key={label} className={`rounded-xl border-2 ${color} shadow-md p-6 flex flex-col items-center`}>
              <span className="text-xl font-semibold mb-2 text-gray-800">{label}</span>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className={`${bar} h-4 rounded-full`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 mb-4">{progress}%</span>
              <button
                className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/evidence/${key}`)}
              >
                Show Evidence
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
