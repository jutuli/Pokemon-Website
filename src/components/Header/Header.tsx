import { useState } from "react";
import "./Header.css";
import { PokemonTypes } from "../PokemonTypes/POKEMONTYPES";


export default function Header() {
	const [menu, setMenu] = useState<boolean>(false);
	return (
		<header>
			<img className="dark-light-mode" src="/src/assets/dark-light-mode-logo.png" alt="Logo Dark-Light-Mode" title="Logo Dark-Light-Mode" aria-label="Logo Dark-Light-Mode" />
			<div className="logo">
				<img src="/src/assets/pokemon-logo.png" alt="Pokemon-Logo" title="Pokemon-Logo" aria-label="Pokemon-Logo" />
			</div>
			<img className="burger-menu" src="/src/assets/hamburger-menu.png" alt="Hamburger-Menu-Icon" title="Hamburger-Menu-Icon" aria-label="Hamburger-Menu-Icon" onClick={() => setMenu(prev => !prev)} />

			{/* Pokemon-Typen anzeigen/ausblenden wenn der Menu-Button geklickt wird */}
			{menu && <PokemonTypes />}

			<div className="header-input-section">
				<input className="input-search" type="text" placeholder="Search Pokemon" />
				<button className="btn-search" type="button">Search</button>
			</div>
		</header>
	)
}
