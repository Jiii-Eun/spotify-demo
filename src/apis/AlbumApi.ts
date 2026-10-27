import type { AlbumResponse } from "../types/albumType";
import type { SearchResponse } from "../types/searchType";
import { fetchData } from "./fatchData";

// export const getRizeMusic = async (clientCredentialToken: string) => {
//   return await fetchData<AlbumResponse>(
//     "/browse/new-releases?limit=8",
//     clientCredentialToken,
//   );
// };

export const getRizeMusic = async (clientCredentialToken: string) => {
  return await fetchData<AlbumResponse>(
    "/search?q=IU&type=album&limit=8",
    clientCredentialToken,
  );
};

export const getSearchAlbums = async (clientCredentialToken: string) => {
  return await fetchData<SearchResponse>(
    "/search?q=IU&type=album&limit=8",
    clientCredentialToken,
  );
};
