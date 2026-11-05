import type { SearchType } from "../types/searchType";

export const HOME_SECTION_LIMIT = 8;

export const HOME_SECTION_QUERIES = {
  risingAlbums: { type: "album" as const, q: "top hits" },
  artists: { type: "artist" as const, q: "k-pop" },
  albums: { type: "album" as const, q: "indie" },
  shows: { type: "show" as const, q: "podcast" },
  episodes: { type: "episode" as const, q: "interview" },
  audiobooks: { type: "audiobook" as const, q: "story" },
} satisfies Record<string, { type: SearchType; q: string }>;
