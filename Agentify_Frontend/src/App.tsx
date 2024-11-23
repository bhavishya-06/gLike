import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import StockPastAnalysis from './components/stock-past-analysis';
import FinancialAdvisor from './components/ai-interface';
import { AutomaticLoanApproverComponent } from './components/automatic-loan-approver';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => JSON.parse(localStorage.getItem('isAuthenticated') || 'false')
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist login state
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear login state
  };

  useEffect(() => {
    // Ensure state sync with storage on initial load
    const authState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authState);
  }, []);

  return (
    <GoogleOAuthProvider clientId="153850379233-m4icd5fkmqd5nt7pd4f55ke0t3i0v0r7.apps.googleusercontent.com">
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/financial-advisor" element={<FinancialAdvisor />} />
              <Route path="/analysis" element={<StockPastAnalysis />} />
              <Route path="/loan-approver" element={<AutomaticLoanApproverComponent />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {isAuthenticated && (
          <button onClick={handleLogout} style={{ position: 'fixed', top: 10, right: 10 }}>
            Logout
          </button>
        )}
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
