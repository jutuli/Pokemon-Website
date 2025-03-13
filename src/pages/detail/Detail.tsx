import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mainContext } from '../../context/MainProvider';
import './detail.css';

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
  height: number;
  weight: number;
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
    <section className="detail">
      <div className="pokemon-view">
        <img
          src={pokemonDetails?.sprites.other.home.front_default}
          alt={name}
        />
      </div>
      <h2>
        <span>{`#0${String(pokemonDetails?.id).padStart(3, '0')}`}</span>
        <span>
          {name && name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </span>
      </h2>
      <ul>
        {pokemonDetails?.types.map((type) => (
          <li key={type.slot} className={`type-btn ${type.type.name}`}>
            {type.type.name}
          </li>
        ))}
      </ul>
      <div className="height-and-weight">
        <article>
          <h2>Height</h2>
          <p>{pokemonDetails?.height ? pokemonDetails.height * 10 : ''} cm</p>
        </article>
        <article>
          <h2>Weight</h2>
          <p>{pokemonDetails?.weight ? pokemonDetails.weight / 10 : ''} kg</p>
        </article>
      </div>
    </section>
  );
};

export default Detail;
