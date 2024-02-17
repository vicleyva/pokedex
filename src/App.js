import { useEffect, useState } from 'react';

import { useFetch } from "./hooks/useFetch";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/shared/components/Loading";
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import NotFound from "./components/pages/NotFound/NotFound";
import HomePage from "./components/pages/HomePage/HomePage";
import PokemonPage from './components/pages/PokemonPage/PokemonPage';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  const { error, isLoading, reset, sendRequest } = useFetch()
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    const getPokedex = async () => {
      try {
        const pokedexRequest = await sendRequest(`${process.env.REACT_APP_BASE_URL}pokedex/1`)
        setPokedex(pokedexRequest)
      } catch (error) {
        // console.log(error);
      }
    }
    getPokedex()
    return () => reset()
  }, [])

  if (!!error) {
    return <ErrorPage error={error} />
  }

  return (
    <div
      className='h-screen flex'
    >
      {!!isLoading && <Loading />}
      {!isLoading && !!pokedex && <Sidebar pokedex={pokedex} />}
      {!isLoading && <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pokemon/:id' element={<PokemonPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>}
    </div>
  );
}

export default App;
