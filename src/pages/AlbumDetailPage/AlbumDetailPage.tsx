import { styled, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner";
import { useGetAlbum } from "../../hooks/useAlbum";
import type { SpotifyAlbumDetail } from "../../apis/albumDetailApi";
import type {
  PlaylistItem,
  PlaylistTrackItem,
} from "../../types/playlistType";
import Tracks from "../PlaylistDetailPage/components/Tracks";

const Page = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: "24px 16px 48px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 8px 40px",
    gap: 16,
  },
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 24,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },
}));

const Cover = styled("img")(({ theme }) => ({
  width: 180,
  height: 180,
  borderRadius: 8,
  objectFit: "cover",
  backgroundColor: theme.palette.background.black200,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
}));

const TrackSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  minWidth: 0,
});

function toPlaylistItems(album: SpotifyAlbumDetail): PlaylistItem[] {
  const tracks = album.tracks?.items?.filter(Boolean) ?? [];

  return tracks.map((track) => {
    const item = {
      ...track,
      album: {
        album_type: album.album_type,
        total_tracks: album.total_tracks,
        available_markets: album.available_markets,
        external_urls: album.external_urls,
        href: album.href,
        id: album.id,
        images: album.images,
        name: album.name,
        release_date: album.release_date,
        release_date_precision: album.release_date_precision,
        type: album.type,
        uri: album.uri,
        artists: album.artists,
      },
      external_ids: { isrc: "", ean: "", upc: "" },
      popularity: 0,
    } as unknown as PlaylistTrackItem;

    return {
      added_at: "" as unknown as Date,
      added_by: {
        external_urls: track.external_urls,
        href: track.href,
        id: track.id,
        name: track.name,
        type: track.type,
        uri: track.uri,
      },
      is_local: track.is_local,
      item,
    };
  });
}

export default function AlbumDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: album, isLoading, error } = useGetAlbum(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!album) return <ErrorMessage message="앨범 정보를 찾을 수 없습니다." />;

  const coverUrl = album.images?.[0]?.url ?? "";
  const artistName = album.artists?.map((a) => a.name).join(", ") ?? "";
  const playlistItems = toPlaylistItems(album);

  return (
    <Page>
      <Header>
        <Cover src={coverUrl} alt={album.name} />
        <div>
          <Typography variant="body2" color="text.secondary">
            앨범
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, mb: 1 }}>
            {album.name}
          </Typography>
          <Typography color="text.secondary">{artistName}</Typography>
        </div>
      </Header>

      <TrackSection>
        <Typography variant="h3">노래</Typography>
        <Tracks tracks={playlistItems} showAddedAt={false} />
      </TrackSection>
    </Page>
  );
}
