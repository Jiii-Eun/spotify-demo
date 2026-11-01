import type { SearchInfiniteData } from "../../types/searchType";

export default function SearchResultPage({
  searchResults,
}: {
  searchResults: SearchInfiniteData;
}) {
  return (
    <div>SearchResultPage {searchResults.pages[0].tracks.items[0].name}</div>
  );
}
