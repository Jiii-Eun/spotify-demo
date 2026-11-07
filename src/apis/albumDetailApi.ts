import type { Album } from "../types/albumType";
import type { ApiResponse } from "../types/apiResponse";
import type { Artist, ExternalUrls, Restrictions } from "../types/commonType";
import { fetchData } from "./fatchData";

export interface AlbumTrack {
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable?: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}

export interface SpotifyAlbumDetail extends Album {
  tracks: ApiResponse<AlbumTrack>;
  popularity?: number;
  label?: string;
}

export const getAlbum = async (
  albumId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyAlbumDetail>(
    `/albums/${albumId}`,
    clientCredentialToken,
  );
};
