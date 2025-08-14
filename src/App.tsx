import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 
import LoginGate from './components/LoginGate';


function App() {
  const [showStars, setShowStars] = useState(() => {
    const stored = localStorage.getItem("showStars");
    return stored === "true"; // convert string to boolean
  });

  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated") === "true";
  });

  const handleAccess = (showRating:boolean) => {
    setShowStars(showRating);
    setAuthenticated(true);
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("showStars", showRating.toString());
  };

  const handleLogout = () => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("showStars");
  localStorage.removeItem("cart"); 
  setAuthenticated(false);
};

  if (!authenticated) {
    return <LoginGate onAccess={handleAccess} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProcurementPortal showStars={showStars} onLogout={handleLogout} />
        }
      />
      <Route
        path="/devices/:category/:id"
        element={<DeviceDetail showStars={showStars} />}
      />
    </Routes>
  );
}

export default App;
