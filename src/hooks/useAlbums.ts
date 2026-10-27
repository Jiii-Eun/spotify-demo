import { useQuery } from "@tanstack/react-query";
import { getRizeMusic, getSearchAlbums } from "../apis/AlbumApi";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetRizeMusic = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getRizeMusic"],
    queryFn: async () => {
      return await getRizeMusic(clientCredentialToken as string);
    },
  });
};

export const useGetSearchAlbums = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getSearchAlbums"],
    queryFn: async () => {
      return await getSearchAlbums(clientCredentialToken as string);
    },
  });
};
