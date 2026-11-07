import type { SpotifyArtist } from "../types/trackType";
import { fetchData } from "./fatchData";

export const getArtist = async (
  artistId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyArtist>(
    `/artists/${artistId}`,
    clientCredentialToken,
  );
};
