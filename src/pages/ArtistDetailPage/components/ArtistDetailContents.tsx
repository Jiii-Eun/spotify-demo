import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, styled, Typography } from "@mui/material";
import type { PlaylistItem, PlaylistTrackItem } from "../../../types/playlistType";
import type { Track } from "../../../types/trackType";
import Tracks from "../../PlaylistDetailPage/components/Tracks";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: "20px 24px 48px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "16px 12px 40px",
    gap: 18,
  },
}));

const PlayCircle = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(1.08)",
  },
}));

const TrackSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  minWidth: 0,
});

function toPlaylistItems(tracks: Track[]): PlaylistItem[] {
  return tracks.map((track) => ({
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
    item: track as unknown as PlaylistTrackItem,
  }));
}

type ArtistDetailContentsProps = {
  tracks: Track[];
};

export default function ArtistDetailContents({
  tracks,
}: ArtistDetailContentsProps) {
  const playlistItems = toPlaylistItems(tracks);

  return (
    <Root>
      <PlayCircle aria-label="재생">
        <PlayArrowIcon sx={{ fontSize: 32 }} />
      </PlayCircle>

      <TrackSection>
        <Typography variant="h3">인기</Typography>
        <Tracks tracks={playlistItems} showAddedAt={false} />
      </TrackSection>
    </Root>
  );
}
