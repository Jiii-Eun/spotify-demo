import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";

export const useGetCurrentUserProfile = () => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      return await getCurrentUserProfile(accessToken as string);
    },
    enabled: !!accessToken,
    staleTime: 0,
  });
};
