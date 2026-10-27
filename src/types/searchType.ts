import type { ApiResponse } from "./apiResponse";
import type { Album } from "./albumType";
import type {
  Artist,
  ExternalIds,
  ExternalUrls,
  Image,
  Restrictions,
  Owner,
  Copyright,
  ResumePoint,
  Author,
} from "./commonType";

export interface SearchResponse {
  tracks: ApiResponse<SearchTrack>;
  artists: ApiResponse<SearchArtist>;
  albums: ApiResponse<SearchAlbum>;
  playlists: ApiResponse<SearchPlaylist>;
  shows: ApiResponse<SearchShow>;
  episodes: ApiResponse<SearchEpisode>;
}

export interface SearchExternal {
  external_urls: ExternalUrls;
  images: Image[];
  name: string;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SearchTrack {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  is_playable: boolean;
  restrictions: Restrictions;
  name: string;
  track_number: number;
  is_local: boolean;
}

export interface SearchArtist extends SearchExternal {}

export interface SearchAlbum extends SearchExternal {
  album_type: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  artists: Artist[];
}

export interface SearchPlaylist extends SearchExternal {
  collaborative: boolean;
  description: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
}

export interface SearchShow extends SearchExternal {
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  publisher: string;
  total_episodes: number;
}

export interface SearchEpisode extends SearchExternal {
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
}

export interface SearchAudiobooks extends SearchExternal {
  authors: Author[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  languages: string[];
  narrators: Author[];
  total_chapters: number;
}
