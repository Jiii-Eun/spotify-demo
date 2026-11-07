import type { Album } from "./albumType";
import type {
  Artist,
  ExternalIds,
  ExternalUrls,
  Image,
  Restrictions,
} from "./commonType";

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable?: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  restrictions?: Restrictions;
}

export interface SpotifyArtist {
  external_urls: ExternalUrls;
  followers?: { href: string | null; total: number };
  genres?: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}
