import type { AlbumResponse } from "../types/apiType";
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
