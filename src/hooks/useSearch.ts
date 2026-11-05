import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type UseQueryResult,
} from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSearch } from "../apis/searchApi";
import type {
  SearchRequest,
  SearchResponse,
  SearchType,
} from "../types/searchType";
import { SEARCH_TYPE_OPTIONS_MAP } from "../configs/searchConfig";

export const useGetSearch = (params: SearchRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  if (!params) {
    throw new Error("Params are required");
  }

  const { q, type, ...rest } = params;

  return useInfiniteQuery<
    SearchResponse,
    Error,
    InfiniteData<SearchResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey: ["search", q, type, rest],
    queryFn: ({ pageParam }) => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getSearch(clientCredentialToken, {
        q,
        type,
        offset: pageParam,
        ...rest,
      });
    },
    enabled: !!q.trim() && !!clientCredentialToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const key = SEARCH_TYPE_OPTIONS_MAP[type as SearchType];
      const next = lastPage[key]?.next ?? null;
      if (!next) return undefined;

      const url = new URL(next);
      const nextOffset = url.searchParams.get("offset");
      if (!nextOffset) return undefined;
      return parseInt(nextOffset, 10);
    },
  });
};

export const useGetSearchResults = (
  q: string,
): UseQueryResult<SearchResponse, Error> => {
  const clientCredentialToken = useClientCredentialToken();
  const query = q.trim();

  return useQuery<SearchResponse, Error>({
    queryKey: ["search-results", query],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getSearch(clientCredentialToken, {
        q: query,
        type: "track,album,artist",
        limit: 10,
      });
    },
    enabled: !!query && !!clientCredentialToken,
  });
};

export const useGetHomeSection = (
  type: SearchType,
  q: string,
  limit = 8,
): UseQueryResult<SearchResponse, Error> => {
  const clientCredentialToken = useClientCredentialToken();
  const query = q.trim();

  return useQuery<SearchResponse, Error>({
    queryKey: ["home-section", type, query, limit],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getSearch(clientCredentialToken, {
        q: query,
        type,
        limit,
      });
    },
    enabled: !!query && !!clientCredentialToken,
  });
};
