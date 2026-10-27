import type { ApiResponse } from "./apiResponse";
import type { Album } from "./albumType";
import type {
  Artist,
  ExternalIds,
  Image,
  Restrictions,
  Owner,
  Copyright,
  ResumePoint,
} from "./commonType";

export interface SearchResponse {
  tracks: ApiResponse<SearchTrack>;
  artists: ApiResponse<SearchExternal>;
  albums: ApiResponse<SearchAlbum>;
  playlists: ApiResponse<SearchPlaylist>;
  shows: ApiResponse<SearchShow>;
  episodes: ApiResponse<SearchEpisode>;
}

export interface SearchExternal extends Artist {
  images: Image[];
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
  authors: Artist[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  languages: string[];
  narrators: Artist[];
  total_chapters: number;
}
