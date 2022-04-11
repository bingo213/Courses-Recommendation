import {
  COLORS,
  Account,
  GrowthGraph,
  Clipboard,
  AngleDown,
} from '../../../atoms';
import { DropdownItem } from '../DropdownItem';

export const menu = (
  <>
    <DropdownItem label="Label" />
    <DropdownItem label="Label" hasDivider />
    <DropdownItem
      label="Label"
      prefixIcon={<Account width={24} fill={COLORS.textSecondary} />}
    />
    <DropdownItem
      label="Label"
      prefixIcon={<GrowthGraph width={24} fill={COLORS.textSecondary} />}
    />
    <DropdownItem
      label="Label"
      prefixIcon={<GrowthGraph width={24} fill={COLORS.textSecondary} />}
      suffixIcon={<AngleDown width={24} fill={COLORS.textSecondary} />}
    />
    <DropdownItem
      active={true}
      label="Label"
      prefixIcon={<Clipboard width={24} fill={COLORS.textSecondary} />}
    />
  </>
);
