import SampleAuditorPage from './sampleAuditorPage';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginGate from './components/LoginGate';
import EvidencePage from './components/EvidencePage';


function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authenticated") === "true";
  });

  const handleAccess = () => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginGate onAccess={handleAccess} />;
  }

  return (
    <Routes>
      <Route
        path="/"
  element={<SampleAuditorPage onLogout={handleLogout} />}
      />
      <Route
        path="/evidence/:category"
        element={<EvidencePage />}
      />
    </Routes>
  );
}

export default App;
