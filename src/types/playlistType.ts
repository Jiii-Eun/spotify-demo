import type { ExternalUrls, Image } from "./commonType";
import type { ApiResponse } from "./apiResponse";

export type PlaylistResponse = ApiResponse<Playlist>;

export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  public: boolean | null;
  snapshot_id: string;
  items: PlaylistTracksRef;
  tracks: PlaylistTracksRef;
  type: string;
  uri: string;
}

export interface PlaylistOwner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string | null;
}

export interface PlaylistTracksRef {
  href: string;
  total: number;
}
