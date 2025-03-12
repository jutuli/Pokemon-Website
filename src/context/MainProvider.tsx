import { createContext, useState, ReactNode } from 'react';

interface IMainContextProps {
  selectedPokemon: any;
  setSelectedPokemon: (pokemon: any) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  filteredPokemon: any[];
  setFilteredPokemon: (pokemon: any[]) => void;
}

export const mainContext = createContext<IMainContextProps | null>(null);

export default function MainProvider({ children }: { children: ReactNode }) {
  // ausgewähltes Pokemon
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  // Suchbegriff wird hier gespeichert um dann weiterverarbeitet zu werden
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Typenauswahl von Pokemon wird hier gespeichert (für die Filterung der Pokemon)
  const [selectedType, setSelectedType] = useState<string | null>(null);
  // gefilterte Pokemon werden hier gespeichert
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);

  return (
    <mainContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        filteredPokemon,
        setFilteredPokemon,
      }}>
      {children}
    </mainContext.Provider>
  );
}
