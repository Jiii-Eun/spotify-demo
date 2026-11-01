import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getRizeMusic, getSearchAlbums } from "../apis/albumsApi";

export const useGetRizeMusic = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getRizeMusic"],
    queryFn: async () => {
      if (!clientCredentialToken) return;
      return await getRizeMusic(clientCredentialToken);
    },
  });
};

export const useGetSearchAlbums = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getSearchAlbums"],
    queryFn: async () => {
      if (!clientCredentialToken) return;
      return await getSearchAlbums(clientCredentialToken);
    },
  });
};
