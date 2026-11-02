import { CATEGORY_COLORS } from "../configs/colorConfig";
import type { SearchType } from "../types/searchType";

export const categoryColor = (type: SearchType) => {
  let hash = 0;
  for (let i = 0; i < type.length; i += 1) {
    hash = (hash * 31 + type.charCodeAt(i)) >>> 0;
  }
  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length];
};
