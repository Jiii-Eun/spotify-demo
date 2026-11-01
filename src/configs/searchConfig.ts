import type { SearchType } from "../types/searchType";

export const SEARCH_TYPE_OPTIONS_MAP = {
  track: "tracks",
  album: "albums",
  artist: "artists",
  playlist: "playlists",
  show: "shows",
  episode: "episodes",
  audiobook: "audiobooks",
};

export const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  track: "곡",
  album: "앨범",
  artist: "아티스트",
  playlist: "플레이리스트",
  show: "쇼",
  episode: "에피소드",
  audiobook: "오디오북",
};

export const SEARCH_TYPE_OPTIONS = (
  Object.keys(SEARCH_TYPE_OPTIONS_MAP) as SearchType[]
).map((value) => ({
  value,
  label: SEARCH_TYPE_LABELS[value],
}));
