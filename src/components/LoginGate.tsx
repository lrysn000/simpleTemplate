import { useState } from "react";

export default function LoginGate({ onAccess }: { onAccess: (showRating: boolean) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "a") {
      onAccess(false); // no rating
    } else if (password === "b") {
      onAccess(true); // show rating
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome to our prototype test</h1>
        <p className="text-gray-700 mb-4 text-center">
        Please enter the access password to continue.
        </p>
      <input
        type="password"
        className="border p-2 rounded w-64 mb-2"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleLogin}
      >
        Access Portal
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
