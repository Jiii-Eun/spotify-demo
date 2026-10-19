import { useParams } from "react-router-dom";

export default function SearchResultPage() {
  const { query } = useParams();

  return <div>SearchResultPage {query}</div>;
}
