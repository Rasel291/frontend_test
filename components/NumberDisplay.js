// components/NumberDisplay.js
import React from 'react';

const NumberDisplay = ({ averagePrice }) => {
    return (
        <div className="number-display">
            <h2>Average Price: ${averagePrice.toFixed(2)}</h2>
        </div>
    );
};

export default NumberDisplay;
