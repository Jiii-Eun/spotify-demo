import type { Artist, BaseItemName } from "./commonType";
import type { Restrictions } from "./commonType";
import type { ExternalUrls } from "./commonType";
import type { Image } from "./commonType";
import type { ApiResponse } from "./apiResponse";

export interface AlbumResponse {
  albums: ApiResponse<Album>;
}

export interface Album extends BaseItemName {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  images: Image[];
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  artists: Artist[];
}
