import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getPlaylistItems,
  getUserPlaylists,
  postCreatePlaylist,
} from "../apis/playlistApi";
import type {
  CreatePlaylistRequest,
  GetPlaylistItemsRequest,
} from "../types/playlistType";
import getSpotifyAuthUrl from "../utils/auth";

export const useGetUserPlaylists = (limit: number) => {
  const accessToken = localStorage.getItem("access_token");

  return useInfiniteQuery({
    queryKey: ["userPlaylists"],
    queryFn: ({ pageParam }) => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return getUserPlaylists({ limit, offset: pageParam }, accessToken);
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  const accessToken = localStorage.getItem("access_token");
  return useInfiniteQuery({
    queryKey: ["playlistItems", params],
    queryFn: ({ pageParam }) => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return getPlaylistItems({ offset: pageParam, ...params }, accessToken);
    },
    enabled: !!params.playlist_id,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? parseInt(nextOffset) : undefined;
    },
  });
};

export const usePostCreatePlaylist = () => {
  const accessToken = localStorage.getItem("access_token");

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlaylistRequest) => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return postCreatePlaylist(data, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPlaylists"] });
    },
  });
};

export const useHandleCreatePlaylist = () => {
  const { mutate: createPlaylist, isPending } = usePostCreatePlaylist();
  const accessToken = localStorage.getItem("access_token");
  const handleCreatePlaylist = (params?: CreatePlaylistRequest) => {
    if (isPending) return;

    if (!accessToken) return getSpotifyAuthUrl();

    createPlaylist(
      { ...params, name: "나의 플레이 리스트" },
      {
        onError: () => {
          getSpotifyAuthUrl();
        },
      },
    );
  };

  return { handleCreatePlaylist, isPending };
};
