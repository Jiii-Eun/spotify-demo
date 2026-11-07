import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getAlbum,
  type SpotifyAlbumDetail,
} from "../apis/albumDetailApi";
import useClientCredentialToken from "./useClientCredentialToken";

export const useGetAlbum = (
  albumId: string,
): UseQueryResult<SpotifyAlbumDetail, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery<SpotifyAlbumDetail, Error>({
    queryKey: ["album", albumId],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("Client credential token is required");
      }
      return getAlbum(albumId, clientCredentialToken);
    },
    enabled: !!albumId && !!clientCredentialToken,
  });
};
