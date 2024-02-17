import React, { useEffect, useState } from 'react';

import { capitalizeFirstLetter } from "../../../shared/helpers/utils";
import { FaPlay, FaStop } from 'react-icons/fa';
import RomanNumerals from 'roman-numerals';
import Progress from '../Progress/Progress';

const formatApiTexts = (growthRate) => {
    const words = growthRate.split('-');
    const formattedGrowthRate = words.map(word => capitalizeFirstLetter(word)).join(' ');
    return formattedGrowthRate;
};

const calculateHatchCounter = (counter) => {
    return `${255 * (counter)} - ${255 * (counter + 1)}`
}

const formatUnits = (unit) => {
    return (unit * 0.1).toFixed(2)
}

const getGenerationNumber = (generation) => {
    const [, romanNumeral] = generation.split('-');
    const arabicNumber = RomanNumerals.toArabic(romanNumeral.toUpperCase());
    return arabicNumber;
};

export default function PokemonDetails({ pokemonData }) {
    const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { pokemonSpecie, pokemonInfo } = pokemonData;
    const pokemonDescription = pokemonSpecie.flavor_text_entries.find(x => x.language.name === 'en')
    const pokemonGrowthRate = formatApiTexts(pokemonSpecie.growth_rate.name)
    const pokemonGenera = pokemonSpecie.genera.find(x => x.language.name === 'en')
    const pokemonHability = pokemonInfo.abilities.find(x => !x.is_hidden)
    const pokemonHiddenHability = pokemonInfo.abilities.find(x => x.is_hidden)
    const pokemonTypes = pokemonInfo.types.map(x => capitalizeFirstLetter(x.type.name)).join('/')
    const eggGroups = pokemonSpecie.egg_groups.map(x => formatApiTexts(x.name))
    const baseHP = pokemonInfo.stats.find(x => x.stat.name === 'hp').base_stat;
    const baseAttack = pokemonInfo.stats.find(x => x.stat.name === 'attack').base_stat;
    const baseDefense = pokemonInfo.stats.find(x => x.stat.name === 'defense').base_stat;
    const baseSP = pokemonInfo.stats.find(x => x.stat.name === 'special-attack').base_stat;
    const baseSD = pokemonInfo.stats.find(x => x.stat.name === 'special-defense').base_stat;
    const baseSpeed = pokemonInfo.stats.find(x => x.stat.name === 'speed').base_stat;
    const cryUrl = pokemonInfo.cries.latest;
    const orderedSprites = [
        pokemonInfo.sprites.front_default,
        pokemonInfo.sprites.back_default,
        pokemonInfo.sprites.front_female,
        pokemonInfo.sprites.front_shiny,
        pokemonInfo.sprites.back_shiny,
        pokemonInfo.sprites.front_shiny_female,
        pokemonInfo.sprites.back_shiny_female,
    ]
    let avaiableSprites = [];
    avaiableSprites = orderedSprites.filter(x => !!x)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSpriteIndex((prevIndex) => (prevIndex + 1) % avaiableSprites.length);
        }, 3500);

        return () => clearInterval(intervalId);
    }, [avaiableSprites]);

    const playCry = () => {
        const audio = new Audio(cryUrl);
        audio.play().then(() => {
            setIsPlaying(true);
        }).catch((error) => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        });
    };

    return (
        <div className="w-full p-4 space-y-6 overflow-y-auto">
            <div className="container space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tighter">{capitalizeFirstLetter(pokemonSpecie.name)}</h1>
                    <p className="text-gray-500 ">{pokemonGenera?.genus || 'No data'}</p>
                </div>
                <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-10">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            alt={capitalizeFirstLetter(pokemonSpecie.name)}
                            className="aspect-square overflow-hidden rounded-xl object-cover"
                            height="180rem"
                            src={avaiableSprites[currentSpriteIndex]}
                            width="180rem"
                        />
                        <div className="mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                                onClick={playCry}
                                disabled={isPlaying}
                            >
                                {isPlaying ? <FaStop className="mr-2" /> : <FaPlay className="mr-2" />}
                                {isPlaying ? 'Stop Cry' : 'Play Cry'}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="font-medium">Type</dt>
                            <dd>{pokemonTypes}</dd>
                            <dt className="font-medium">Height</dt>
                            <dd>{formatUnits(pokemonInfo.height)} m</dd>
                            <dt className="font-medium">Weight</dt>
                            <dd>{formatUnits(pokemonInfo.weight)} kg</dd>
                        </dl>
                        <p>
                            {pokemonDescription?.flavor_text || 'No description'}
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Abilities</h3>
                        <ul className="list-disc list-inside">
                            <li>{capitalizeFirstLetter(pokemonHability.ability.name)}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Hidden Ability</h3>
                        <ul className="list-disc list-inside">
                            <li>{capitalizeFirstLetter(pokemonHiddenHability?.ability.name || 'No data')}</li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Egg Groups</h3>
                        <ul className="list-disc list-inside">
                            {!!eggGroups.length && eggGroups.map((eggGroup, eggIndex) => (
                                <li key={eggIndex}>{eggGroup}</li>
                            ))}
                            {!eggGroups.length && <li>No data</li>}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Hatch Time</h3>
                        <p>{calculateHatchCounter(pokemonSpecie.hatch_counter)} steps</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Base Experience</h3>
                        <p>{pokemonInfo.base_experience || 'No data'}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Growth Rate</h3>
                        <p>{pokemonGrowthRate}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Capture Rate</h3>
                        <p>{pokemonSpecie.capture_rate}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Base Happiness</h3>
                        <p>{pokemonSpecie.base_happiness}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Color</h3>
                        <p>{capitalizeFirstLetter(pokemonSpecie.color.name)}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Shape</h3>
                        <p>{capitalizeFirstLetter(pokemonSpecie?.shape?.name || 'No data')}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Habitat</h3>
                        <p>{capitalizeFirstLetter(pokemonSpecie?.habitat?.name || 'No data')}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Generation</h3>
                        <p>{getGenerationNumber(pokemonSpecie.generation.name)}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Legendary</h3>
                        <p>{pokemonSpecie.is_legendary ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Base Stats Total</h3>
                        <p>{pokemonInfo.stats.reduce((acc, cur) => acc + cur.base_stat, 0)}</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">HP {`(${baseHP})`}</h3>
                        <Progress value={baseHP} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Attack {`(${baseAttack})`}</h3>
                        <Progress value={baseAttack} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Defense {`(${baseDefense})`}</h3>
                        <Progress value={baseDefense} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Special Attack {`(${baseSP})`}</h3>
                        <Progress value={baseSP} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">Special Defense {`(${baseSD})`}</h3>
                        <Progress value={baseSD} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Speed {`(${baseSpeed})`}</h3>
                        <Progress value={baseSpeed} />
                    </div>
                </div>
            </div>
        </div>
    );
}
