import { useParams } from "react-router-dom";

export default function PlaylistDetailPage() {
  const { id } = useParams();

  return <div>PlaylistDetailPage {id}</div>;
}
