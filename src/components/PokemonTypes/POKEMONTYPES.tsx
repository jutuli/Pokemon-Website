import "./POKEMONTYPES.css"
import axios from "axios";

//* Import Interface Pokemon-Types
import { PokemonType } from "../../interfaces/type-data";
import { useEffect, useState } from "react";

export function PokemonTypes() {

	const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const resp = await axios.get("https://pokeapi.co/api/v2/type");
				setPokemonTypes(resp.data.results);
				console.log(resp.data.results);

			} catch (error) {
				console.error("Fehler beim Laden der Pokémon-Typen", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="type-container">
			<div className="type-top-section">
				<img src="/src/assets/pokemon-logo.png" alt="Pokemon-Logo" title="Pokemon-Logo" aria-label="Pokemon-Logo" />
				<img className="close-button" src="/src/assets/close-button.png" alt="Close-Button" title="Close-Button" aria-label="Close-Button" />
			</div>
			<img src="/src/assets/type-logo.png" alt="Pokemon-Type-Logo" title="Pokemon-Type-Logo" aria-label="Pokemon-Type-Logo" className="type-logo" />
			{/* Dynamische Buttons für Pokémon-Typen */}
			<article className="btn-pokemons">
				{pokemonTypes.map((item) => (
					<button key={item.name} className={`btn-pokemon ${item.name}`}>
						{item.name.toUpperCase()}
					</button>
				))}
			</article>
		</div>
	)
}
