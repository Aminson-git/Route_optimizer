import React from 'react';
import './OptimizationControls.css';

const OptimizationControls = ({ 
  onOptimize, 
  onClear, 
  iterations, 
  onIterationsChange, 
  disabled 
}) => {
  return (
    <div className="optimization-controls">
      <h2>Optimization Settings</h2>
      
      <div className="control-group">
        <label htmlFor="iterations">Iterations:</label>
        <div className="slider-container">
          <input
            type="range"
            id="iterations"
            min="100"
            max="10000"
            step="100"
            value={iterations}
            onChange={(e) => onIterationsChange(parseInt(e.target.value))}
          />
          <span className="slider-value">{iterations}</span>
        </div>
        <p className="slider-description">
          More iterations = better route, slower computation
        </p>
      </div>
      
      <div className="buttons">
        <button 
          className="optimize-button"
          onClick={onOptimize}
          disabled={disabled}
        >
          Optimize Route
        </button>
        
        <button 
          className="clear-button"
          onClick={onClear}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default OptimizationControls;