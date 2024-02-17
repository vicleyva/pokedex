import React from 'react'

import pokeballImage from "../../../assets/imgs/pokeball.png";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center">
        <img src={pokeballImage} alt="Pokeball" className="w-1/5 h-1/5 animate-bounce" />
        <p className="mt-4 text-4xl font-bold animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
