import { Navigate, useParams } from "react-router-dom";
import { useGetPlaylistItems } from "../../hooks/usePlaylist";
import PlaylistDetailContent from "./components/PlaylistDetailContent";
import PlaylistDetailFooter from "./components/PlaylistDetailFooter";
import PlaylistDetailHeader from "./components/PlaylistDetailHeader";

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Navigate to="/" />;

  const { data: playlistItems } = useGetPlaylistItems({
    playlist_id: id,
  });

  console.log("playlistItems", playlistItems);

  return (
    <>
      <PlaylistDetailHeader id={id} playlistItems={playlistItems} />
      <PlaylistDetailContent id={id} />
      <PlaylistDetailFooter id={id} />
    </>
  );
}
