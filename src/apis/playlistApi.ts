import { fetchData } from "./fatchData";
import type {
  PlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
} from "../types/playlistType";
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

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest,
  clientCredentialToken: string,
) => {
  const { playlist_id, ...query } = params;

  const queryParams = Object.fromEntries(
    Object.entries(query)
      .filter(([, v]) => v != null && v !== "")
      .map(([k, v]) => [k, String(v)]),
  );

  const queryString =
    Object.keys(queryParams).length > 0
      ? `?${new URLSearchParams(queryParams).toString()}`
      : "";

  return await fetchData<GetPlaylistItemsResponse>(
    `/playlists/${params.playlist_id}/items${queryString}`,
    clientCredentialToken,
  );
};
