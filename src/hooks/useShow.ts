import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type UseQueryResult,
} from "@tanstack/react-query";
import { getEpisode } from "../apis/episodeApi";
import { getShow, getShowEpisodes } from "../apis/showApi";
import type {
  ShowEpisodesResponse,
  SpotifyEpisode,
  SpotifyShow,
} from "../types/showType";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetShow = (
  showId: string,
): UseQueryResult<SpotifyShow, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SpotifyShow, Error>({
    queryKey: ["show", showId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getShow(showId, clientCredentialToken);
    },
    enabled: !!showId && !!clientCredentialToken,
  });
};

export const useGetShowEpisodes = (showId: string, limit = 20) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery<
    ShowEpisodesResponse,
    Error,
    InfiniteData<ShowEpisodesResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey: ["show-episodes", showId, limit],
    queryFn: ({ pageParam }) => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getShowEpisodes(showId, clientCredentialToken, {
        limit,
        offset: pageParam,
      });
    },
    enabled: !!showId && !!clientCredentialToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset, 10) : undefined;
    },
  });
};

export const useGetEpisode = (
  episodeId: string,
): UseQueryResult<SpotifyEpisode, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SpotifyEpisode, Error>({
    queryKey: ["episode", episodeId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getEpisode(episodeId, clientCredentialToken);
    },
    enabled: !!episodeId && !!clientCredentialToken,
  });
};
