import type { TopResultItem } from "../pages/SearchResultPage/components/TopResult";

export const TopResultView = (item: TopResultItem) => {
  if (item.kind === "track") {
    return {
      imageUrl: item.data.album?.images?.[0]?.url ?? "",
      title: item.data.name,
      meta: `Song • ${item.data.artists?.[0]?.name ?? ""}`,
      rounded: false,
    };
  }
  if (item.kind === "artist") {
    return {
      imageUrl: item.data.images?.[0]?.url ?? "",
      title: item.data.name,
      meta: "Artist",
      rounded: true,
    };
  }
  return {
    imageUrl: item.data.images?.[0]?.url ?? "",
    title: item.data.name,
    meta: `Album • ${item.data.artists?.[0]?.name ?? ""}`,
    rounded: false,
  };
};
