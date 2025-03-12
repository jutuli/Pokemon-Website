import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../context/MainProvider';
import './home.css';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
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
    selectedType,
    setSelectedPokemon,
    filteredPokemon,
    setFilteredPokemon,
  } = context;

  // Alle Pokemon holen
  useEffect(() => {
    const fetchGeneralPokemonList = async () => {
      try {
        const resp = await axios.get('https://pokeapi.co/api/v2/pokemon');
        if (resp.data.results) {
          setPokemonList(resp.data.results);
        }
      } catch (error) {
        console.error('Error while Fetching all Pokemon:', error);
        return;
      }
    };
    fetchGeneralPokemonList();
  }, []);

  // Spezifisches Pokemon holen je nach Suchbegriff
  useEffect(() => {
    const fetchSpecificPokemon = async () => {
      try {
        const resp = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
        );
        if (resp.data) {
          setFilteredPokemon([resp.data]);
        }
      } catch (error) {
        console.error('Error while Fetching specific Pokemon:', error);
      }
    };
    fetchSpecificPokemon();
  }, [searchTerm]);

  return (
    <section className="home">
      <ul>
        {pokemonList.map((pokemon: Pokemon) => {
          const id = pokemon.url.split('/')[6]; // ID aus URL holen
          return <PokemonCard key={pokemon.name} id={id} pokemon={pokemon} />;
        })}
      </ul>
    </section>
  );
};

export default Home;
