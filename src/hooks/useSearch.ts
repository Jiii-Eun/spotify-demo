import { useInfiniteQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getSearch } from "../apis/searchApi";
import type {
  SearchRequest,
  SearchResponse,
  SearchType,
} from "../types/searchType";

export const useGetSearch = (params: SearchRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  const SEARCH_RESULT_KEY: Record<SearchType, keyof SearchResponse> = {
    track: "tracks",
    artist: "artists",
    album: "albums",
    playlist: "playlists",
    show: "shows",
    episode: "episodes",
    audiobook: "audiobooks",
  };

  if (!params) {
    throw new Error("Params are required");
  }

  const { q, type, ...rest } = params;

  return useInfiniteQuery({
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
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const key = SEARCH_RESULT_KEY[type];
      const next = lastPage[key]?.next ?? null;
      if (!next) return undefined;

      const url = new URL(next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset) : 0;
    },
  });
};
