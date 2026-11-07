import type { ApiResponse } from "./apiResponse";
import type {
  Artist,
  Copyright,
  ExternalUrls,
  Image,
} from "./commonType";

export interface SimplifiedChapter {
  audio_preview_url?: string | null;
  available_markets?: string[];
  chapter_number: number;
  description: string;
  html_description?: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_playable?: boolean;
  languages: string[];
  name: string;
  release_date?: string;
  release_date_precision?: string;
  type: string;
  uri: string;
}

export interface SpotifyAudiobook {
  authors: Artist[];
  copyrights?: Copyright[];
  description: string;
  html_description?: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type?: string;
  name: string;
  narrators: Artist[];
  total_chapters: number;
  type: string;
  uri: string;
  chapters?: ApiResponse<SimplifiedChapter>;
}

export type AudiobookChaptersResponse = ApiResponse<SimplifiedChapter>;
