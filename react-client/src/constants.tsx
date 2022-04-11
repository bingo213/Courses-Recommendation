import logo from './assets/logo.png';
import { IRegion } from './interfaces';
import vietnamFlag from './assets/vietnam.png';
import englandFlag from './assets/england.png';

export const APP_NAME = 'ScoreU';
export const LOGO = logo;

export const LOCAL_STORAGE = {
  LOCALIZATION: 'localization',
};

export const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    flag: <img src={vietnamFlag} alt="Viet Nam Flag" width={36} />,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: <img src={englandFlag} alt="England Flag" width={36} />,
  },
};
