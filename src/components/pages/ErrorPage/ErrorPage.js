import React from "react";
import sadPikachuImage from "../../../assets/imgs/sad_pikachu.png";

const ErrorPage = ({ error = null }) => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200">
            <div className="flex flex-col items-center">
                <img src={sadPikachuImage} alt="Sad Pikachu" className="w-50 h-50 mb-4" />
                <p className="text-lg font-bold text-red-500">Something went wrong...</p>
                {!!error && <p className="text-lg font-bold text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default ErrorPage;
