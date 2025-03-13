import { useNavigate } from 'react-router-dom';
import './pokemonCard.css';

interface IPokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
  id: string;
}

const PokemonCard = ({ pokemon, id }: IPokemonCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${pokemon.name}`);
  };

  return (
    <>
      <li key={pokemon.name} className="pokemon-card" onClick={handleClick}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt=""
        />
        <h2>{pokemon.name}</h2>
      </li>
    </>
  );
};

export default PokemonCard;
