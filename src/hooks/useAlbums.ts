import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getRizeMusic, getSearchAlbums } from "../apis/albumApi";

export const useGetRizeMusic = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getRizeMusic"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return await getRizeMusic(clientCredentialToken);
    },
  });
};

export const useGetSearchAlbums = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["getSearchAlbums"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return await getSearchAlbums(clientCredentialToken);
    },
  });
};
