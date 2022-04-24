import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { REGIONS } from '../constants';

export interface LanguageState {
  currentLanguage: string;
  changeLanguage?: (language: string) => void;
}

export interface LanguageProviderProps extends LanguageState {
  children: ReactElement;
}

const LanguageStateContext = React.createContext<LanguageState>({
  currentLanguage: REGIONS.vi.key,
});

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}: LanguageProviderProps) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };
  return (
    <LanguageStateContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageStateContext.Provider>
  );
};

export function useLanguage(): LanguageState {
  const context = useContext(LanguageStateContext);
  if (!context) {
    throw new Error(
      'useLanguage must be inside a LanguageStateContext with a state value'
    );
  }
  return context;
}
