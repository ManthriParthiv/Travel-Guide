import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="loader-card">
                <div className="planet-container">
                    <div className="orbit">
                        <div className="plane">✈️</div>
                    </div>
                    <div className="globe">🌍</div>
                </div>
                <h3 className="loading-title">Generating Your Itinerary</h3>
                <p className="loading-desc">Our AI is designing the perfect schedule, curating hotels, and optimizing routes...</p>
                <div className="loading-bar-container">
                    <div className="loading-bar-progress"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner;