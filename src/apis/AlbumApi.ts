import { useFetch } from "../hooks/useFetch";
import type { AlbumResponse } from "../types/apiType";

export const getRizeMusic = () => {
  return useFetch<AlbumResponse>("/browse/new-releases");
};
