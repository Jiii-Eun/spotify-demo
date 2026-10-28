import type { Artist, ExternalIds, Image, Restrictions } from "./commonType";
import type { ApiResponse } from "./apiResponse";
import type { Album } from "./albumType";
import type { SearchEpisode, SearchShow } from "./searchType";

export type PlaylistResponse = ApiResponse<Playlist>;

export interface PlaylistOwner extends Artist {
  display_name: string | null;
}

export interface Playlist extends Artist {
  collaborative: boolean;
  description: string | null;
  images: Image[];
  owner: PlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  items: PlaylistTracksRef;
  tracks: PlaylistTracksRef;
}

export interface PlaylistTracksRef {
  href: string;
  total: number;
}

export interface GetPlaylistItemsRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  limit?: number;
  offset?: number;
  additional_types?: string;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistItem>;

export interface PlaylistItem {
  added_at: Date;
  added_by: Artist;
  is_local: boolean;
  item: PlaylistTrackItem | PlaylistEpisode;
}

export interface PlaylistTrackItem extends Artist {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  is_playable: boolean;
  restrictions: Restrictions;
  is_local: boolean;
}

export interface PlaylistEpisode extends SearchEpisode {
  restrictions: Restrictions;
  show: SearchShow;
}
