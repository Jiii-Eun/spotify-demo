import type { Artist } from "./commonType";
import type { Restrictions } from "./commonType";
import type { ExternalUrls } from "./commonType";
import type { Image } from "./commonType";
import type { ApiResponse } from "./apiResponse";

export interface AlbumResponse {
  albums: ApiResponse<Album>;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}
