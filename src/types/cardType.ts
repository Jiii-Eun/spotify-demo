import type { SearchAlbum } from "./searchType";

export interface MusicCardProps {
  album: SearchAlbum;
  index: number;
}

export interface MusicCardListProps {
  albums: SearchAlbum[];
}
