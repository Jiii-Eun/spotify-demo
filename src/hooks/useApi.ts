import { useQuery } from "@tanstack/react-query";
import { getRizeMusic } from "../apis/AlbumApi";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetRizeMusic = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["getRizeMusic"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is not found");
      }

      return await getRizeMusic(clientCredentialToken);
    },
  });
};
