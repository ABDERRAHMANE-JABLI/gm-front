import { ColorCode } from "@/types/product/wine";

export const COLOR_HEX_MAP: Record<ColorCode, string> = {
    'Ambré': '#FFB701',
    'Rouge': '#CC292B',
    'Rosé': '#FFACAC',
    'Effervescent rosé': '#FFACAC',
    'Effervescent rosé de saignée': '#FFACAC',
    'Orange': '#F58331',
    'Blanc': '#F2EB8F',
    'Effervescent blanc': '#F2EB8F',
    'blanc effervescent': '#F2EB8F',
    'nonWoodAged': '#F8F8FF',
    'woodAged': '#8B5A2B',
};

export function getColorHex(colorCode: ColorCode): string {
  return COLOR_HEX_MAP[colorCode];
}
