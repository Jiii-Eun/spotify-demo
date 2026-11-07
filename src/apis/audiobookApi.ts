import type {
  AudiobookChaptersResponse,
  SpotifyAudiobook,
} from "../types/audiobookType";
import { fetchData } from "./fatchData";

export const getAudiobook = async (
  audiobookId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyAudiobook>(
    `/audiobooks/${audiobookId}`,
    clientCredentialToken,
  );
};

export const getAudiobookChapters = async (
  audiobookId: string,
  clientCredentialToken: string,
  params?: { limit?: number; offset?: number },
) => {
  const limit = params?.limit ?? 20;
  const offset = params?.offset ?? 0;
  return await fetchData<AudiobookChaptersResponse>(
    `/audiobooks/${audiobookId}/chapters?limit=${limit}&offset=${offset}`,
    clientCredentialToken,
  );
};
