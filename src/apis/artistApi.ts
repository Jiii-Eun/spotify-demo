import type { SpotifyArtist, Track } from "../types/trackType";
import { fetchData } from "./fatchData";

export type ArtistTopTracksResponse = {
  tracks: Track[];
};

export const getArtist = async (
  artistId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyArtist>(
    `/artists/${artistId}`,
    clientCredentialToken,
  );
};

export const getArtistTopTracks = async (
  artistId: string,
  clientCredentialToken: string,
  market = "KR",
) => {
  return await fetchData<ArtistTopTracksResponse>(
    `/artists/${artistId}/top-tracks?market=${market}`,
    clientCredentialToken,
  );
};
