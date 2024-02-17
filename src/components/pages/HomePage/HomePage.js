import React from 'react';
import pokeballImage from '../../../assets/imgs/pokeball.png';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center align-center h-full w-full">
            <div className="pokeball-container w-60">
                <img src={pokeballImage} alt="Pokeball" className="pokeball animate-tilt" />
            </div>
            <p className="text-xl mt-4">Welcome to Pokédex</p>
        </div>
    );
};

export default HomePage;
