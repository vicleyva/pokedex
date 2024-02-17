import React from 'react';

import psyduck from "../../../assets/imgs/psyduck.png";

const NotFound = () => {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-full w-full">
            <img
                src={psyduck}
                alt="Psyduck"
                className="mb-8"
                style={{ maxWidth: '15rem' }}
            />
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg mb-8">The page you're looking for doesn't exist.</p>
        </div>
    );
};

export default NotFound;
