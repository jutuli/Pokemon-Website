import { createContext, useState, ReactNode } from 'react';

interface IMainContextProps {
  selectedPokemon: any;
  setSelectedPokemon: (pokemon: any) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedTypeId: number | null;
  setSelectedTypeId: (type: number | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const mainContext = createContext<IMainContextProps | null>(null);

export default function MainProvider({ children }: { children: ReactNode }) {
  // ausgewähltes Pokemon
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  // Suchbegriff wird hier gespeichert um dann weiterverarbeitet zu werden
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Typenauswahl-Id von Pokemon wird hier gespeichert (für die Filterung der Pokemon)
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  // Error State falls Pokemon nicht gefunden wird
  const [error, setError] = useState<string | null>(null);
  // Loading State für die Pokemon-Liste
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <mainContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        searchTerm,
        setSearchTerm,
        selectedTypeId,
        setSelectedTypeId,
        error,
        setError,
        loading,
        setLoading,
      }}>
      {children}
    </mainContext.Provider>
  );
}
