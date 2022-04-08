import { COLORS } from "../../../atoms";
import { Account, GrowthGraph, Clipboard } from "../../../atoms/Icons";
import { DropdownItem } from "../DropdownItem";

export const menu = (
  <>
    <DropdownItem label="Label" />
    <DropdownItem label="Label" hasDivider />
    <DropdownItem label="Label" icon={<Account width={24} fill={COLORS.textSecondary} />} />
    <DropdownItem label="Label" icon={<GrowthGraph width={24} fill={COLORS.textSecondary} /> } />
    <DropdownItem active={true} label="Label" icon={<Clipboard width={24} fill={COLORS.textSecondary} />} />
  </>
);
