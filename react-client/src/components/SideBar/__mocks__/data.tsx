import { COLORS } from '../../../atoms';
import { GrowthGraph, House, Clipboard, Account } from '../../../atoms/Icons';
import { SideBarProps } from '../SideBar';

export const navData: SideBarProps = {
    navItems: [
    { icon: <House width={26} fill={COLORS.textSecondary} />, title: 'Gợi ý môn học' },
    { icon: <GrowthGraph width={26} fill={COLORS.textSecondary} />, title: 'Dự đoán điểm' },
    { icon: <Clipboard width={26} fill={COLORS.textSecondary} />, title: 'Điểm của tôi' },
    { icon: <Account width={26} fill={COLORS.textSecondary} />, title: 'Hồ sơ' },
  ],
};
