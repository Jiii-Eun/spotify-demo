import type { SpotifyEpisode } from "../types/showType";
import { fetchData } from "./fatchData";

export const getEpisode = async (
  episodeId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyEpisode>(
    `/episodes/${episodeId}`,
    clientCredentialToken,
  );
};
