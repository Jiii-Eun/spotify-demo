import { fetchData } from "./fatchData";
import type { PlaylistResponse } from "../types/playlistType";
import type { Options } from "../types/commonType";

export const getUserPlaylists = async (
  { limit, offset }: Options,
  clientCredentialToken: string,
) => {
  return await fetchData<PlaylistResponse>(
    `/me/playlists?limit=${limit}&offset=${offset}`,
    clientCredentialToken,
  );
};
