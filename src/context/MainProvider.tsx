import { createContext, useState, ReactNode } from 'react';

interface IMainContextProps {
  selectedPokemon: any;
  setSelectedPokemon: (pokemon: any) => void;
}

export const mainContext = createContext<IMainContextProps | null>(null);

export default function MainProvider({ children }: { children: ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  return (
    <mainContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
      }}>
      {children}
    </mainContext.Provider>
  );
}
