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
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
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
