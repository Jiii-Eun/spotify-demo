import type {
  SearchResponse,
  SearchRow,
} from "../types/searchType";

function joinNames(items?: { name: string }[]) {
  return items?.map((item) => item.name).join(", ");
}

function getImageUrl(images?: { url: string }[]) {
  return images?.[0]?.url;
}

export function toSearchRows(
  checkType: keyof SearchResponse,
  pages: SearchResponse[],
): SearchRow[] {
  switch (checkType) {
    case "tracks": {
      const items = pages.flatMap((page) => page.tracks?.items ?? []);
      return items.map((item, index) => ({
        key: `track-${item.name}-${item.album?.name ?? ""}-${index}`,
        title: item.name,
        subtitle: joinNames(item.artists),
        meta: item.album?.name,
        imageUrl: getImageUrl(item.album?.images),
      }));
    }
    case "albums": {
      const items = pages.flatMap((page) => page.albums?.items ?? []);
      return items.map((item, index) => ({
        key: `album-${item.id}-${index}`,
        title: item.name,
        subtitle: joinNames(item.artists),
        meta: item.release_date,
        imageUrl: getImageUrl(item.images),
      }));
    }
    case "artists": {
      const items = pages.flatMap((page) => page.artists?.items ?? []);
      return items.map((item, index) => ({
        key: `artist-${item.id}-${index}`,
        title: item.name,
        imageUrl: getImageUrl(item.images),
      }));
    }
    case "playlists": {
      const items = pages.flatMap((page) => page.playlists?.items ?? []);
      return items.map((item, index) => ({
        key: `playlist-${item.id}-${index}`,
        title: item.name,
        subtitle: item.owner?.display_name,
        imageUrl: getImageUrl(item.images),
      }));
    }
    case "shows": {
      const items = pages.flatMap((page) => page.shows?.items ?? []);
      return items.map((item, index) => ({
        key: `show-${item.id}-${index}`,
        title: item.name,
        subtitle: item.publisher,
        imageUrl: getImageUrl(item.images),
      }));
    }
    case "episodes": {
      const items = pages.flatMap((page) => page.episodes?.items ?? []);
      return items.map((item, index) => ({
        key: `episode-${item.id}-${index}`,
        title: item.name,
        subtitle: item.release_date,
        imageUrl: getImageUrl(item.images),
      }));
    }
    case "audiobooks": {
      const items = pages.flatMap((page) => page.audiobooks?.items ?? []);
      return items.map((item, index) => ({
        key: `audiobook-${item.id}-${index}`,
        title: item.name,
        subtitle: joinNames(item.authors),
        imageUrl: getImageUrl(item.images),
      }));
    }
    default:
      return [];
  }
}
