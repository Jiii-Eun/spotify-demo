import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getCurrentUserProfile } from "../apis/userApi";

export const useGetCurrentUserProfile = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["currentUserProfile"],
    enabled: !!clientCredentialToken,
    queryFn: async () => {
      return await getCurrentUserProfile(clientCredentialToken as string);
    },
  });
};
