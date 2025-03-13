import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mainContext } from '../../context/MainProvider';

interface IPokemonDetails {
  name: string;
  id: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
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
  const context = useContext(mainContext);
  const { name } = useParams(); // Pokemonname aus url
  const navigate = useNavigate(); // Redirect falls Pokemon nicht gefunden wird
  if (!context) return null;
  const { error, setError } = context;

  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>();

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!name) return;
      try {
        const resp = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (resp.data) {
          setPokemonDetails(resp.data);
          setError(null); // ✅ Reset error falls Pokemon gefunden wurde
        }
      } catch (error) {
        console.error('Error while Fetching specific Pokemon:', error);
        setError('Pokemon not found 😢');
      }
    };
    fetchPokemon();
  }, [name, setError]);

  useEffect(() => {
    if (error) {
      navigate('/not-found');
    }
  }, [error, navigate]);

  return (
    <div>
      <h1>{name}</h1>
      <img src={pokemonDetails?.sprites.other.home.front_default} alt={name} />
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
