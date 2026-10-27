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
  {
    playlistId,
    market,
    fields,
    limit,
    offset,
    additional_types,
  }: GetPlaylistItemsRequest,
  clientCredentialToken: string,
) => {
  return await fetchData<GetPlaylistItemsResponse>(
    `/playlists/${playlistId}/tracks?market=${market}&fields=${fields}&limit=${limit}&offset=${offset}&additional_types=${additional_types}`,
    clientCredentialToken,
  );
};
