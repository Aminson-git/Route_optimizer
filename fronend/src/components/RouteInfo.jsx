import React from 'react';
import './RouteInfo.css';

const RouteInfo = ({ route, loading }) => {
  if (loading) {
    return <div className="route-info">Optimizing route...</div>;
  }

  if (!route) {
    return null;
  }

  return (
    <div className="route-info">
      <h2>Optimized Route</h2>
      
      <div className="route-stats">
        <div className="stat-item">
          <span className="stat-label">Total Distance:</span>
          <span className="stat-value">
            {Math.round(route.totalDistance).toLocaleString()} km
          </span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Computation Time:</span>
          <span className="stat-value">
            {route.computationTime} ms
          </span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Iterations:</span>
          <span className="stat-value">
            {route.iterations.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="route-path">
        <h3>Optimized Path:</h3>
        <div className="route-countries">
          {route.countries.map((country, index) => (
            <div key={country.code} className="route-country">
              <span className="route-number">{index + 1}</span>
              <span className="route-code">{country.code}</span>
              <span className="route-name">{country.name}</span>
            </div>
          ))}
          <div className="route-country return">
            <span className="route-code">↩</span>
            <span className="route-name">Return to Start</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;