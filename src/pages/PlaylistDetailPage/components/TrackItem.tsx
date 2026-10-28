import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { GlobalStyles, IconButton, styled, Typography } from "@mui/material";
import { useSyncExternalStore } from "react";
import type {
  PlaylistItem,
  PlaylistTrackItem,
} from "../../../types/playlistType";

const trackListCounterStyles = {
  "div:has(> div > .playlist-track-row)": {
    counterReset: "playlist-track",
  },
};

let activeTrackId: string | null = null;
const activeTrackListeners = new Set<() => void>();

const subscribeActiveTrack = (listener: () => void) => {
  activeTrackListeners.add(listener);
  return () => {
    activeTrackListeners.delete(listener);
  };
};

const getActiveTrackId = () => activeTrackId;

const setActiveTrackId = (id: string) => {
  activeTrackId = activeTrackId === id ? null : id;
  activeTrackListeners.forEach((listener) => listener());
};

const Row = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: "grid",
  gridTemplateColumns:
    "40px minmax(180px, 4fr) minmax(120px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr)",
  alignItems: "center",
  columnGap: 16,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "8px 16px",
  borderRadius: 4,
  cursor: "pointer",
  counterIncrement: "playlist-track",
  backgroundColor: isActive ? theme.palette.background.black100 : "transparent",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.background.black100
      : theme.palette.background.black300,
    "& .track-index": {
      display: "none",
    },
    "& .track-play": {
      display: "inline-flex",
    },
    "& .track-actions": {
      opacity: 1,
    },
  },
  ...(isActive && {
    "& .track-index": {
      display: "none",
    },
    "& .track-play": {
      display: "inline-flex",
    },
    "& .track-actions": {
      opacity: 1,
    },
  }),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "40px minmax(0, 1fr) auto",
    columnGap: 12,
    padding: "8px 12px",
    "& .track-album, & .track-added-at": {
      display: "none",
    },
    "& .track-actions-check": {
      display: "none",
    },
    "& .track-actions-more": {
      opacity: 1,
    },
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 8,
    padding: "6px 8px",
    "& .track-index-cell": {
      display: "none",
    },
    "& .track-duration": {
      display: "none",
    },
  },
}));

const IndexCell = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  color: theme.palette.text.secondary,
}));

const IndexText = styled("span")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  fontVariantNumeric: "tabular-nums",
  "&::before": {
    content: "counter(playlist-track)",
  },
}));

const PlayIcon = styled(PlayArrowIcon)(({ theme }) => ({
  display: "none",
  fontSize: 20,
  color: theme.palette.primary.main,
}));

const TitleCell = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 0,
});

const Cover = styled("img")(({ theme }) => ({
  flexShrink: 0,
  width: 40,
  height: 40,
  borderRadius: 4,
  objectFit: "cover",
  backgroundColor: theme.palette.background.black200,
  [theme.breakpoints.down("sm")]: {
    width: 48,
    height: 48,
  },
}));

const TitleInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
});

const TrackName = styled("div")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

const ArtistRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
});

const ExplicitBadge = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "translateY(-1px)",
  minWidth: 18,
  height: 18,
  borderRadius: 9999,
  fontSize: 10,
  fontWeight: 700,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
}));

const ArtistName = styled("span")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 13,
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

const MetaText = styled("div")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

const DurationCell = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
  minWidth: 0,
});

const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 4,
  opacity: 0,
  transition: "opacity 0.15s ease",
});

const actionIconSx = {
  p: 0.5,
  color: "text.secondary",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "transparent",
  },
};

const checkIconSx = {
  fontSize: 18,
  color: "primary.main",
};
const moreIconSx = {
  fontSize: 20,
};

const durationTextSx = {
  minWidth: 40,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  fontSize: 14,
  color: "text.secondary",
};

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatAddedAt = (addedAt: Date | string) => {
  const date = new Date(addedAt);
  if (Number.isNaN(date.getTime())) return "";

  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function TrackItem({ track }: { track: PlaylistItem }) {
  const item = track.item as PlaylistTrackItem;
  const activeId = useSyncExternalStore(
    subscribeActiveTrack,
    getActiveTrackId,
    () => null,
  );
  const isActive = activeId === item.id;
  const { album, artists, name, duration_ms, explicit } = item;
  const coverUrl = album?.images?.[0]?.url;
  const artistNames = artists?.map((artist) => artist.name).join(", ") ?? "";

  return (
    <>
      <GlobalStyles styles={trackListCounterStyles} />
      <Row
        className="playlist-track-row"
        isActive={isActive}
        onClick={() => setActiveTrackId(item.id)}
        role="row"
      >
        <IndexCell className="track-index-cell">
          <IndexText className="track-index" />
          <PlayIcon className="track-play" />
        </IndexCell>

        <TitleCell>
          {coverUrl && <Cover src={coverUrl} alt={name} />}
          <TitleInfo>
            <TrackName>{name}</TrackName>
            <ArtistRow>
              {explicit && (
                <ExplicitBadge>
                  <span
                    style={{
                      lineHeight: 1,
                      transform: "translateX(-0.1px)",
                      display: "block",
                    }}
                  >
                    19
                  </span>
                </ExplicitBadge>
              )}
              <ArtistName>{artistNames}</ArtistName>
            </ArtistRow>
          </TitleInfo>
        </TitleCell>

        <MetaText className="track-album">{album?.name ?? ""}</MetaText>
        <MetaText className="track-added-at">
          {formatAddedAt(track.added_at)}
        </MetaText>

        <DurationCell>
          <Actions className="track-actions track-actions-check">
            <IconButton
              size="small"
              aria-label="저장됨"
              sx={actionIconSx}
              onClick={(event) => event.stopPropagation()}
            >
              <CheckCircleIcon sx={checkIconSx} />
            </IconButton>
          </Actions>
          <Typography
            className="track-duration"
            component="span"
            sx={durationTextSx}
          >
            {formatDuration(duration_ms ?? 0)}
          </Typography>
          <Actions className="track-actions track-actions-more">
            <IconButton
              size="small"
              aria-label="더보기"
              sx={actionIconSx}
              onClick={(event) => event.stopPropagation()}
            >
              <MoreHorizIcon sx={moreIconSx} />
            </IconButton>
          </Actions>
        </DurationCell>
      </Row>
    </>
  );
}
