import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";

export const useGetCurrentUserProfile = () => {
  const clientCredentialToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["currentUserProfile"],
    enabled: !!clientCredentialToken,
    queryFn: async () => {
      return await getCurrentUserProfile(clientCredentialToken as string);
    },
  });
};
