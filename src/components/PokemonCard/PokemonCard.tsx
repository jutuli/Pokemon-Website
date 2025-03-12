import './pokemonCard.css';

interface IPokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
  id: string;
}

const PokemonCard = ({ pokemon, id }: IPokemonCardProps) => {
  return (
    <>
      <li key={pokemon.name} className="pokemon-card">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
        />
        <h2>{pokemon.name}</h2>
      </li>
    </>
  );
};

export default PokemonCard;
