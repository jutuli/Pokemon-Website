import './pokemonTypes.css';
import axios from 'axios';
import { PokemonType } from '../../interfaces/type-data';
import { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../context/MainProvider';
import { set } from 'react-hook-form';

export function PokemonTypes({ closeMenu }: { closeMenu: () => void }) {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [isClosing, setIsClosing] = useState(false); // Steuerung für Fade-Out Animation

  const context = useContext(mainContext);
  if (!context) return null;
  const { setSelectedTypeId } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('https://pokeapi.co/api/v2/type');
        setPokemonTypes(resp.data.results);
      } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Typen', error);
      }
    };
    fetchData();
  }, []);

  // Funktion für sanftes Schließen mit CSS-Animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => closeMenu(), 500); // Menü nach Animation wirklich schließen
  };

  return (
    <div className={`type-container ${isClosing ? 'hidden' : ''}`}>
      <div className="type-top-section">
        <img
          src="/src/assets/pokemon-logo.png"
          alt="Pokemon-Logo"
          title="Pokemon-Logo"
          aria-label="Pokemon-Logo"
        />

        {/* Close-Button mit sanfter Animation */}
        <img
          className="close-button"
          src="/src/assets/close-button.png"
          alt="Close-Button"
          title="Close-Button"
          aria-label="Close-Button"
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <h2>TYPE</h2>
      <p>Select Your Pokemon-Type</p>

      {/* Dynamische Buttons für Pokémon-Typen */}
      <article className="btn-pokemons">
        {pokemonTypes
          .slice() // Erst eine Kopie des Arrays erstellen, um das Original nicht zu verändern
          .sort((a, b) => a.name.localeCompare(b.name)) // Sortiert alphabetisch nach Name
          .map((item) => {
            const id =
              Number(item.url.split('/').filter(Boolean).pop()) || null;
            return (
              <button
                key={item.name}
                className={`btn-pokemon ${item.name}`}
                onClick={() => {
                  setSelectedTypeId(id);
                  handleClose();
                }}>
                {item.name.toUpperCase()}
              </button>
            );
          })}
      </article>
    </div>
  );
}
