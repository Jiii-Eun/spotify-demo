import type { Track } from "../types/trackType";
import { fetchData } from "./fatchData";

export const getTrack = async (
  trackId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<Track>(
    `/tracks/${trackId}`,
    clientCredentialToken,
  );
};
