import { useInfiniteQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSearch } from "../apis/searchApi";
import type { SearchRequest, SearchResponse } from "../types/searchType";
import type { InfiniteData } from "@tanstack/react-query";
import { SEARCH_TYPE_OPTIONS_MAP } from "../configs/searchConfig";

export const useGetSearch = (params: SearchRequest) => {
  const clientCredentialToken = useClientCredentialToken();
  const resultKey = SEARCH_TYPE_OPTIONS_MAP[
    params.type
  ] as keyof SearchResponse;

  return useInfiniteQuery<
    SearchResponse,
    Error,
    InfiniteData<SearchResponse, number>,
    ["search", SearchRequest],
    number
  >({
    queryKey: ["search", params],
    queryFn: async ({ pageParam }) => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return await getSearch(
        { ...params, offset: pageParam },
        clientCredentialToken,
      );
    },
    enabled: !!params.q && !!clientCredentialToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage[resultKey]?.next;
      if (!next) return undefined;

      const url = new URL(next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset, 10) : undefined;
    },
  });
};
