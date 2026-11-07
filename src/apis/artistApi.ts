import type { SearchResponse } from "../types/searchType";
import type { SpotifyArtist, Track } from "../types/trackType";
import { fetchData } from "./fatchData";

export type ArtistTopTracksResponse = {
  tracks: Track[];
};

export const getArtist = async (
  artistId: string,
  clientCredentialToken: string,
) => {
  return await fetchData<SpotifyArtist>(
    `/artists/${artistId}`,
    clientCredentialToken,
  );
};

/** Dev Mode에서 `/artists/{id}/top-tracks`가 403이라 search로 대체 */
export const getArtistTopTracks = async (
  artistId: string,
  clientCredentialToken: string,
  market = "KR",
) => {
  const q = encodeURIComponent(`artist:${artistId}`);
  const data = await fetchData<SearchResponse>(
    `/search?q=${q}&type=track&market=${market}&limit=10`,
    clientCredentialToken,
  );

  const tracks = (data.tracks?.items?.filter(Boolean) ?? []).map(
    (track) =>
      ({
        ...track,
        external_urls: track.album?.external_urls ?? { spotify: "" },
        href: "",
        popularity: 0,
        preview_url: null,
        type: "track",
      }) as Track,
  );

  return { tracks };
};
