import React, { useState } from 'react';
import './CountrySelector.css';

const CountrySelector = ({ countries, selectedCountries, onCountrySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (country) => {
    return selectedCountries.some(c => c.code === country.code);
  };

  return (
    <div className="country-selector">
      <h2>Select Countries</h2>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <div className="selected-count">
        Selected: {selectedCountries.length}/20
      </div>
      
      <div className="countries-list">
        {filteredCountries.map(country => (
          <div
            key={country.code}
            className={`country-item ${isSelected(country) ? 'selected' : ''}`}
            onClick={() => onCountrySelect(country)}
          >
            <span className="country-flag">{country.code}</span>
            <span className="country-name">{country.name}</span>
          </div>
        ))}
        
        {filteredCountries.length === 0 && (
          <div className="no-results">No countries found</div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;