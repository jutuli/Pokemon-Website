import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mainContext } from '../../context/MainProvider';
import './detail.css';
import { set } from 'react-hook-form';

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
  const navigate = useNavigate(); // Redirect falls Pokemon nicht gefunden wird oder zurück navigieren
  if (!context) return null;
  const { error, setError, loading, setLoading } = context;

  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
      {loading && <div className="loading">Loading pokemon...⚡️</div>}
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
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <span>&#8617;&nbsp;</span> back
        </button>
      </div>
    </section>
  );
};

export default Detail;
