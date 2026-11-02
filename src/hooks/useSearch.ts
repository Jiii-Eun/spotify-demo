import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSearch } from "../apis/searchApi";
import type { SearchRequest, SearchResponse } from "../types/searchType";
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
      const key = SEARCH_TYPE_OPTIONS_MAP[type];
      const next = lastPage[key]?.next ?? null;
      if (!next) return undefined;

      const url = new URL(next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset) : 0;
    },
  });
};
