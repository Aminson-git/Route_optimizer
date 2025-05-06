import React, { useState, useEffect } from 'react';
import Globe from './components/Globe';
import CountrySelector from './components/Countryselector';
import OptimizationControls from './components/OptimizationControls';
import RouteInfo from './components/RouteInfo';
import { fetchAllCountries, optimizeRoute } from './services/api';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iterations, setIterations] = useState(1000);

  useEffect(() => {
    // Fetch countries from the backend API
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const handleCountrySelect = (country) => {
    if (selectedCountries.find(c => c.code === country.code)) {
      // Remove if already selected
      setSelectedCountries(prev => prev.filter(c => c.code !== country.code));
    } else {
      // Add if not selected
      setSelectedCountries(prev => [...prev, country]);
    }
  };

  const handleOptimize = async () => {
    if (selectedCountries.length < 2) {
      setError('Please select at least 2 countries');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const countryCodes = selectedCountries.map(country => country.code);
      const result = await optimizeRoute(countryCodes, iterations);
      setOptimizedRoute(result);
    } catch (err) {
      setError('Failed to optimize route');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedCountries([]);
    setOptimizedRoute(null);
  };

  const handleIterationsChange = (value) => {
    setIterations(value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Route Optimizer Challenge</h1>
        <p>Select countries, optimize the route, and visualize the solution on a 3D globe</p>
      </header>

      <div className="main-content">
        <div className="sidebar">
          <CountrySelector 
            countries={countries}
            selectedCountries={selectedCountries}
            onCountrySelect={handleCountrySelect}
          />
          
          <OptimizationControls 
            onOptimize={handleOptimize}
            onClear={handleClearSelection}
            iterations={iterations}
            onIterationsChange={handleIterationsChange}
            disabled={loading || selectedCountries.length < 2}
          />

          {optimizedRoute && (
            <RouteInfo 
              route={optimizedRoute}
              loading={loading}
            />
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
        
        <div className="globe-container">
          <Globe 
            countries={countries}
            selectedCountries={selectedCountries}
            optimizedRoute={optimizedRoute}
          />
        </div>
      </div>
    </div>
  );
}

export default App;