import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getArtist,
  getArtistTopTracks,
  type ArtistTopTracksResponse,
} from "../apis/artistApi";
import { getTrack } from "../apis/trackApi";
import type { SpotifyArtist, Track } from "../types/trackType";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetTrack = (
  trackId: string,
): UseQueryResult<Track, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<Track, Error>({
    queryKey: ["track", trackId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getTrack(trackId, clientCredentialToken);
    },
    enabled: !!trackId && !!clientCredentialToken,
  });
};

export const useGetArtist = (
  artistId: string,
): UseQueryResult<SpotifyArtist, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SpotifyArtist, Error>({
    queryKey: ["artist", artistId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getArtist(artistId, clientCredentialToken);
    },
    enabled: !!artistId && !!clientCredentialToken,
  });
};

export const useGetArtistTopTracks = (
  artistId: string,
  market = "KR",
): UseQueryResult<ArtistTopTracksResponse, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<ArtistTopTracksResponse, Error>({
    queryKey: ["artist-top-tracks", artistId, market],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getArtistTopTracks(artistId, clientCredentialToken, market);
    },
    enabled: !!artistId && !!clientCredentialToken,
  });
};
