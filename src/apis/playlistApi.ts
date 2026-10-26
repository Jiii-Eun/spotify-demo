import { fetchData } from "./fatchData";
import type { PlaylistResponse } from "../types/playlistType";

export const getUserPlaylists = async (
  limit: number,
  offset: number,
  clientCredentialToken: string,
) => {
  return await fetchData<PlaylistResponse>(
    `/me/playlists?limit=${limit}&offset=${offset}`,
    clientCredentialToken,
  );
};
