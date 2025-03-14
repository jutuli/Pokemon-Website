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
	const { searchTerm, selectedTypeId, setSelectedPokemon } = context;

	// Pokemon holen (alle oder spezifisch durch SearchTerm oder Type gefiltert)
	useEffect(() => {
		const fetchPokemonList = async () => {
			let url = 'https://pokeapi.co/api/v2/pokemon';
			if (searchTerm) {
				url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
			} else if (selectedTypeId) {
				url = `https://pokeapi.co/api/v2/type/${selectedTypeId}`;
			}
			try {
				const resp = await axios.get(url);
				if (resp.data.results) {
					
					setPokemonList(resp.data.results);
				}
				console.log(resp.data);
			} catch (error) {
				console.error('Error while Fetching all Pokemon:', error);
				return;
			}

		};
		fetchPokemonList();
	}, [searchTerm, selectedTypeId]);

	return (
		<section className="home">
			{pokemonList.length === 0 && (
				<div>
					<h2>No Pokemon found 😢</h2>
					<p>
						Try searching for a different Pokemon name or select a different
						type.
					</p>
				</div>
			)}
			<ul>
				{pokemonList.map((pokemon: Pokemon) => {
					const id = pokemon.url.split('/').filter(Boolean).pop(); // ID aus URL holen
					if (!id) {
						console.error('Error while getting ID from URL');
						return null;
					}
					return <PokemonCard key={pokemon.name} id={id} pokemon={pokemon} />;
				})}
			</ul>
		</section>
	);
};

export default Home;
