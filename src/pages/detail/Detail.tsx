import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IPokemonDetails {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: [
    {
      slot: number;
      type: {
        name: string;
      };
    }
  ];
}

const Detail = () => {
  const { name } = useParams(); // Pokemonname aus url
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const resp = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (resp.data) {
          setPokemonDetails(resp.data);
          console.log(resp.data);
        }
      } catch (error) {
        console.error('Error while Fetching specific Pokemon:', error);
      }
    };
    fetchPokemon();
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>
      <img src={pokemonDetails?.sprites.front_default} alt={name} />
      <h2>Types:</h2>
      <ul>
        {pokemonDetails?.types.map((type) => (
          <li key={type.slot}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
