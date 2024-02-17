import React from 'react';

const Progress = ({ value }) => {
    const normalizedValue = Math.min(100, Math.max(0, value));
    return (
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-blue-200">
            <div
                className="h-full w-full flex-1 bg-blue-700 transition-all"
                style={{ transform: `translateX(-${100 - normalizedValue}%)` }}
            ></div>
        </div>
    );
};

export default Progress;
