import { useTranslation } from 'react-i18next';
import { LOCAL_STORAGE } from '../constants';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
      localStorage.setItem(LOCAL_STORAGE.LOCALIZATION, language);
    }
  };
  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
}; 