import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../context/MainProvider';
import './home.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const context = useContext(mainContext);
  if (!context) return null;
  const {
    searchTerm,
    selectedTypeId,
    setSelectedPokemon,
    loading,
    setLoading,
  } = context;

  // Pokemon holen (alle oder spezifisch durch SearchTerm oder Type gefiltert)
  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setPokemonList([]);
      let resp;
      let url = 'https://pokeapi.co/api/v2/pokemon';
      try {
        if (searchTerm) {
          url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
          resp = await axios.get(url);
          if (resp.data) {
            setPokemonList([{ name: resp.data.name, url, id: resp.data.id }]);
          }
        } else if (selectedTypeId) {
          url = `https://pokeapi.co/api/v2/type/${selectedTypeId}`;
          resp = await axios.get(url);
          if (resp.data.pokemon) {
            const newPokemonList = resp.data.pokemon.map((pokemon: any) => {
              const id = pokemon.pokemon.url.split('/').filter(Boolean).pop();
              return {
                name: pokemon.pokemon.name,
                url: pokemon.pokemon.url,
                id,
              };
            });
            setPokemonList(newPokemonList);
          }
        } else {
          resp = await axios.get(url);
          if (resp.data.results) {
            const newPokemonList = resp.data.results.map((pokemon: any) => {
              const id = pokemon.url.split('/').filter(Boolean).pop();
              return { name: pokemon.name, url: pokemon.url, id };
            });
            setPokemonList(newPokemonList);
          }
        }
      } catch (error) {
        console.error('Error while Fetching all Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, [searchTerm, selectedTypeId]);
  return (
    <section className="home">
      {loading && <p className="loading-p">Loading Pokémon... ⏳</p>}{' '}
      {/* 🔥 Loading-Anzeige */}
      {!loading && pokemonList.length === 0 && (
        <div>
          <h2>No Pokemon found 😢</h2>
          <p>
            Try searching for a different Pokemon name or select a different
            type.
          </p>
        </div>
      )}
      <ul>
        {pokemonList.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.name} id={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </section>
  );
};

export default Home;
