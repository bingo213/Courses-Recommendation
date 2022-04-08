type Attributes = { [key: string]: { [key: string]: string } | undefined };

export const getArrowClassName = (attributes: Attributes) => {
  const placementForArrow = attributes?.popper?.['data-popper-placement'];
  if (!placementForArrow) return '';
  if (placementForArrow.startsWith('top')) return 'arrow-bottom';
  if (placementForArrow.startsWith('bottom')) return 'arrow-top';
  if (placementForArrow.startsWith('left')) return 'arrow-right';
  if (placementForArrow.startsWith('right')) return 'arrow-left';
};