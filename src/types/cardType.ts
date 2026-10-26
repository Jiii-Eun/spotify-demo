import type { Album } from "./albumType";

export interface MusicCardProps {
  album: Album;
  index: number;
}

export interface MusicCardListProps {
  albums: Album[];
}
