import type { AlbumResponse } from "../types/albumType";
import type { SearchResponse } from "../types/searchType";
import {
  HOME_SECTION_LIMIT,
  HOME_SECTION_QUERIES,
} from "../configs/homeConfig";
import { fetchData } from "./fatchData";

const { q: risingQ, type: risingType } = HOME_SECTION_QUERIES.risingAlbums;

// export const getRizeMusic = async (clientCredentialToken: string) => {
//   return await fetchData<AlbumResponse>(
//     "/browse/new-releases?limit=8",
//     clientCredentialToken,
//   );
// };

export const getRizeMusic = async (clientCredentialToken: string) => {
  return await fetchData<AlbumResponse>(
    `/search?q=${encodeURIComponent(risingQ)}&type=${risingType}&limit=${HOME_SECTION_LIMIT}`,
    clientCredentialToken,
  );
};

export const getSearchAlbums = async (clientCredentialToken: string) => {
  return await fetchData<SearchResponse>(
    `/search?q=${encodeURIComponent(risingQ)}&type=${risingType}&limit=${HOME_SECTION_LIMIT}`,
    clientCredentialToken,
  );
};
