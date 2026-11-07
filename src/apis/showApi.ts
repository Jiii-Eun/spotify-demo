import type { ShowEpisodesResponse, SpotifyShow } from "../types/showType";
import { fetchData } from "./fatchData";

export const getShow = async (
  showId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyShow>(
    `/shows/${showId}`,
    clientCredentialToken,
  );
};

export const getShowEpisodes = async (
  showId: string,
  clientCredentialToken: string,
  params?: { limit?: number; offset?: number },
) => {
  const limit = params?.limit ?? 20;
  const offset = params?.offset ?? 0;
  return await fetchData<ShowEpisodesResponse>(
    `/shows/${showId}/episodes?limit=${limit}&offset=${offset}`,
    clientCredentialToken,
  );
};
