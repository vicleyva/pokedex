import React, { useEffect, useState } from 'react';


import { NavLink } from 'react-router-dom';
import { capitalizeFirstLetter } from '../shared/helpers/utils';
import { MdCatchingPokemon } from "react-icons/md";
import './Sidebar.css';

export default function Sidebar({ pokedex }) {
    const [pokedexList, setPokedexList] = useState();

    useEffect(() => {
        !!pokedex && setPokedexList(pokedex.pokemon_entries);
    }, [pokedex]);

    return (
        <div className='custom-sidebar min-w-60 h-full bg-gray-400 flex flex-col overflow-y-auto p-4'>
            <span className='text-center text-lg font-semibold mb-4'>National Pokédex</span>
            {!!pokedexList &&
                pokedexList.map((pokemon) => (
                    < NavLink
                        key={pokemon.entry_number}
                        to={`/pokemon/${pokemon.entry_number}`}
                        className='nav-link bg-blue-700 text-white flex justify-between rounded-md py-2 px-4 mb-2 cursor-pointer'
                    >
                        {({ isActive }) => {
                            return isActive ?
                                <>
                                    <span className='mr-2'>({pokemon.entry_number})</span>
                                    <span className="flex items-center">
                                        <MdCatchingPokemon />
                                    </span>
                                    <span>{capitalizeFirstLetter(pokemon.pokemon_species.name)}</span>
                                </>
                                :
                                <>
                                    <span className='mr-2'>({pokemon.entry_number})</span>
                                    <span>{capitalizeFirstLetter(pokemon.pokemon_species.name)}</span>
                                </>
                        }}

                    </NavLink>
                ))
            }
        </div >
    );
}
