import { useState, useEffect, useRef, useContext } from 'react';
import './Header.css';
import ThemeToogle from '../ThemeToogle/ThemeToogle';
import { PokemonTypes } from '../PokemonTypes/PokemonTypes';
import { mainContext } from '../../context/MainProvider';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  //* State für das Logo und den Box-Shadow
  const [scrolled, setScrolled] = useState(false);

  //* useNavigate für die Navigation auf die Home-Seite bei Klick auf das Logo
  const navigate = useNavigate();

  //* Context für Pokemon-Suche
  const context = useContext(mainContext);
  if (!context) return null;
  const { setSearchTerm } = context;

  //* useref für Search-Input-Feld
  const searchRef = useRef<HTMLInputElement>(null);

  //* Überwachen des Scroll-Events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Fügt den Box-Shadow hinzu
      } else {
        setScrolled(false); // Entfernt den Box-Shadow
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //* State zum Öffnen & Schließen des Menüs
  const [menu, setMenu] = useState<boolean>(false);

  // Menü sanft ein- & ausblenden
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  //* Suchfunktion
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const inputString = searchRef.current?.value || '';
    setSearchTerm(inputString);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <ThemeToogle />

      <div className="logo-input-box">
        <div className="logo">
          <img
            src="/src/assets/pokemon-logo.png"
            alt="Pokemon-Logo"
            onClick={() => {
              navigate('/');
            }}
            aria-label="Pokemon-Logo"
          />
        </div>
        <form action="" onSubmit={handleSearch}>
          <div className="header-input-section">
            <input
              ref={searchRef}
              className="input-search"
              type="text"
              placeholder="Search Pokemon"
            />
            <button className="btn-search" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Menü-Button zum Öffnen des Pokémon-Typen-Menüs */}
      <img
        className="burger-menu"
        src="/src/assets/hamburger-menu.png"
        alt="Hamburger-Menu-Icon"
        title="Hamburger-Menu-Icon"
        aria-label="Hamburger-Menu-Icon"
        onClick={toggleMenu}
      />

      {/* Pokémon-Typen-Menü wird nur gerendert, wenn `menu === true` */}
      {menu && <PokemonTypes closeMenu={toggleMenu} />}
    </header>
  );
}
