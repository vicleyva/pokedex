import React, { useEffect, useState } from 'react'

import { useFetch } from "../../../hooks/useFetch";
import Loading from '../../shared/components/Loading';
import NotFound from "../NotFound/NotFound";
import PokemonDetails from './PokemonDetails.js/PokemonDetails';
import { useParams } from 'react-router-dom';

export default function PokemonPage({ pokedex }) {
    const { error, isLoading, reset, sendRequest } = useFetch()
    const [pokemonData, setPokemonData] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        const getPokemonData = async () => {
            try {
                const pokemonSpecie = await sendRequest(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                const pokedex_target = pokemonSpecie.varieties.find(x => x.is_default);
                const pokemonInfo = await sendRequest(pokedex_target.pokemon.url)
                setPokemonData({ pokemonSpecie, pokemonInfo })
            } catch (error) {
                // console.log(error);
            }
        }
        getPokemonData()
        return () => reset()
    }, [id]);

    if (error) {
        return <div className='w-full h-full'>
            <NotFound />
        </div>
    }

    return (
        <div className='flex w-full h-full'>
            {!!isLoading && <Loading />}
            {!isLoading && !!pokemonData && !!pokedex && <PokemonDetails pokedex={pokedex} pokemonData={pokemonData} />}
        </div>
    )
}
