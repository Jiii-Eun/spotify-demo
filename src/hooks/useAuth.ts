import { useQuery } from "@tanstack/react-query";
import { getRizeMusic } from "../apis/AlbumApi";
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
