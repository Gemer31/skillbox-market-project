import eventBus from '@/eventBus';
import colors from '@/data/colors';

export function gotoPage(pageName, pageParams) {
  eventBus.$emit('gotoPage', pageName, pageParams);
}

export function getColorValue(colorId) {
  return colors.find((color) => color.id === colorId).value;
}
