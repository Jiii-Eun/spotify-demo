import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type UseQueryResult,
} from "@tanstack/react-query";
import { getAudiobook, getAudiobookChapters } from "../apis/audiobookApi";
import type {
  AudiobookChaptersResponse,
  SpotifyAudiobook,
} from "../types/audiobookType";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetAudiobook = (
  audiobookId: string,
): UseQueryResult<SpotifyAudiobook, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SpotifyAudiobook, Error>({
    queryKey: ["audiobook", audiobookId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getAudiobook(audiobookId, clientCredentialToken);
    },
    enabled: !!audiobookId && !!clientCredentialToken,
  });
};

export const useGetAudiobookChapters = (audiobookId: string, limit = 20) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery<
    AudiobookChaptersResponse,
    Error,
    InfiniteData<AudiobookChaptersResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey: ["audiobook-chapters", audiobookId, limit],
    queryFn: ({ pageParam }) => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getAudiobookChapters(audiobookId, clientCredentialToken, {
        limit,
        offset: pageParam,
      });
    },
    enabled: !!audiobookId && !!clientCredentialToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset, 10) : undefined;
    },
  });
};
