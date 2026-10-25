import { fetchData } from "./fatchData";
import type { UserProfileResponse } from "../types/userType";

export const getCurrentUserProfile = async (
  clientCredentialToken: string,
): Promise<UserProfileResponse> => {
  return await fetchData<UserProfileResponse>("/me", clientCredentialToken);
};
