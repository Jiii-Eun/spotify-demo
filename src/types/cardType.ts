import type { Album } from "./apiType";

export interface MusicCardProps {
  album: Album;
  index: number;
}

export interface MusicCardListProps {
  albums: Album[];
}
