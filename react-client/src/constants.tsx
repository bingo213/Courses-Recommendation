import logo from './assets/logo.png';
import { IRegion } from './interfaces';
import vietnamFlag from './assets/vietnam.png';
import englandFlag from './assets/england.png';
import { NavElement } from './components';
import { Account, COLORS, GrowthGraph, House, Clipboard } from './atoms';

export const APP_NAME = 'ScoreU';
export const LOGO = logo;

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

export const DEFAULT_LANGUAGE = REGIONS.vi.key;

export const SIDE_BAR: NavElement[] = [
  { icon: <House width={26} fill={COLORS.textSecondary} />, title: 'CoursesRecommend', link: "recommend" },
  { icon: <GrowthGraph width={26} fill={COLORS.textSecondary} />, title: 'PredictGrade', link: "predict" },
  { icon: <Clipboard width={26} fill={COLORS.textSecondary} />, title: 'MyGrade', link: "my_grade" },
  { icon: <Account width={26} fill={COLORS.textSecondary} />, title: 'AccountSetting', link: "account" },
]
