import { useState, useEffect } from "react";
import "./Header.css";
import ThemeToogle from "../ThemeToogle/ThemeToogle";
import { PokemonTypes } from "../PokemonTypes/POKEMONTYPES";

export default function Header() {
	//* State für das Logo und den Box-Shadow
	const [hideLogo, setHideLogo] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	//* Überwachen des Scroll-Events
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setHideLogo(true);
				setScrolled(true); // Fügt den Box-Shadow hinzu
			} else {
				setHideLogo(false);
				setScrolled(false); // Entfernt den Box-Shadow
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	//* State zum Öffnen & Schließen des Menüs
	const [menu, setMenu] = useState<boolean>(false);

	// Menü sanft ein- & ausblenden
	const toggleMenu = () => {
		setMenu((prev) => !prev);
	};

	return (
		<header className={scrolled ? "scrolled" : ""}>

			<ThemeToogle />

			<div className="logo-input-box">
				<div className={`logo ${hideLogo ? "hide-logo" : ""}`}>
					<img
						src="/src/assets/pokemon-logo.png"
						alt="Pokemon-Logo"
						title="Pokemon-Logo"
						aria-label="Pokemon-Logo"
					/>
				</div>
				<div className="header-input-section">
					<input className="input-search" type="text" placeholder="Search Pokemon" />
					<button className="btn-search" type="button">Search</button>
				</div>
			</div>

			{/* Menü-Button zum Öffnen des Pokémon-Typen-Menüs */}
			<img
				className="burger-menu"
				src="/src/assets/hamburger-menu.png"
				alt="Hamburger-Menu-Icon"
				title="Hamburger-Menu-Icon"
				aria-label="Hamburger-Menu-Icon"
				onClick={toggleMenu} // Menü öffnen/schließen
			/>

			{/* Pokémon-Typen-Menü wird nur gerendert, wenn `menu === true` */}
			{menu && <PokemonTypes closeMenu={toggleMenu} />}
		</header>
	);
}
