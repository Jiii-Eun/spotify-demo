import type { SearchAlbum } from "./searchType";

export interface MusicCardProps {
  album: SearchAlbum;
  index: number;
  onClick?: () => void;
}

export interface MusicCardListProps {
  albums: SearchAlbum[];
  onAlbumClick?: (album: SearchAlbum) => void;
}
