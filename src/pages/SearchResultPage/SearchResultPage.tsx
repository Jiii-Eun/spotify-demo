export default function SearchResultPage({ searchResult }: { searchResult }) {
  return <div>SearchResultPage {searchResult.tracks.items[0].name}</div>;
}
