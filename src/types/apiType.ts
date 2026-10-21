export interface AlbumResponse {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
  total_tracks: number;
}

export interface Artist {}
export interface Image {}
