import axios from "axios";

//* Import Interface Pokemon-Types
import { PokemonType } from "../../interfaces/type-data";
import { useEffect, useState } from "react";

export function PokemonTypes() {

	const [pokemonType, setPokemonType] = useState<PokemonType>()
	useEffect(() => {

		const fetchData = async () => {
			const resp = await axios.get("https://pokeapi.co/api/v2/type");
			console.log(resp);

		}
		fetchData();
	}, [])

	return (
		<div className="type-container">
			
		</div>
	)
}
