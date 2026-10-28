import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";

export const useGetCurrentUserProfile = () => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is not found");
      }
      return await getCurrentUserProfile(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 0,
  });
};
