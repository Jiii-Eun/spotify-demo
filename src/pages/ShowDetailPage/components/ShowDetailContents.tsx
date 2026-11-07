import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Alert,
  IconButton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useGetShowEpisodes } from "../../../hooks/useShow";
import type { SimplifiedEpisode, SpotifyShow } from "../../../types/showType";
import PlaylistDropbox from "../../SearchResultPage/components/PlaylistDropbox";

const Layout = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.6fr) minmax(240px, 0.9fr)",
  gap: 32,
  padding: "24px 24px 48px",
  boxSizing: "border-box",
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    padding: "16px 12px 40px",
    gap: 24,
  },
}));

const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

const EpisodeList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

const EpisodeRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "96px minmax(0, 1fr) auto",
  gap: 16,
  padding: "16px 12px",
  margin: "0 -12px",
  borderRadius: 8,
  borderBottom: `1px solid ${theme.palette.background.black200}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "72px minmax(0, 1fr)",
    gap: 12,
    padding: "12px 8px",
    margin: "0 -8px",
  },
}));

const Thumb = styled("img")(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: 8,
  objectFit: "cover",
  backgroundColor: theme.palette.background.black200,
  [theme.breakpoints.down("sm")]: {
    width: 72,
    height: 72,
  },
}));

const EpisodeBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

const EpisodeTitle = styled("div")(({ theme }) => ({
  fontSize: 15,
  fontWeight: 700,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

const EpisodeShow = styled("div")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}));

const EpisodeDesc = styled("div")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

const EpisodeMeta = styled("div")(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
}));

const RowActions = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 8,
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    gridColumn: "1 / -1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const PlusWrap = styled("div")({
  position: "relative",
});

const PlayCircle = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(1.08)",
  },
}));

const DetailCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
  borderRadius: 8,
  backgroundColor: theme.palette.background.black300,
}));

const Sentinel = styled("div")({
  height: 1,
  width: "100%",
});

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return `${hours}시간 ${rem}분`;
  }
  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

function formatReleaseMeta(dateStr: string, durationMs: number) {
  if (!dateStr) return formatDuration(durationMs);
  const date = new Date(dateStr);
  const weekday = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("ko-KR", { weekday: "long" });
  return weekday
    ? `${weekday} • ${formatDuration(durationMs)}`
    : formatDuration(durationMs);
}

type ShowDetailContentsProps = {
  show: SpotifyShow;
};

function EpisodePlus({ uri }: { uri: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "error" | "success";
    message: string;
  }>({ open: false, severity: "error", message: "" });

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <PlusWrap
      ref={rootRef}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <IconButton
        aria-label="플레이리스트에 추가"
        size="small"
        onClick={() => {
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
            setOpen(false);
            setToast({
              open: true,
              severity: "error",
              message: "로그인 후 이용해주세요",
            });
            return;
          }
          setOpen((prev) => !prev);
        }}
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          border: `1px solid ${theme.palette.text.secondary}`,
          width: 28,
          height: 28,
          "&:hover": {
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            backgroundColor: "transparent",
          },
        })}
      >
        <AddIcon sx={{ fontSize: 16 }} />
      </IconButton>
      {open ? (
        <PlaylistDropbox
          trackUri={uri}
          anchorEl={rootRef.current}
          onClose={() => setOpen(false)}
          onAdded={() =>
            setToast({
              open: true,
              severity: "success",
              message: "플레이리스트에 추가되었습니다",
            })
          }
        />
      ) : null}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </PlusWrap>
  );
}

export default function ShowDetailContents({ show }: ShowDetailContentsProps) {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetShowEpisodes(show.id, 20);

  const { ref, inView } = useInView({ rootMargin: "120px 0px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const episodes =
    data?.pages.flatMap((page) => page.items?.filter(Boolean) ?? []) ?? [];

  return (
    <Layout>
      <Column sx={{ order: { xs: 2, md: 1 } }}>
        <Typography variant="h3">모든 에피소드</Typography>
        {isLoading ? (
          <Typography color="text.secondary">불러오는 중…</Typography>
        ) : (
          <EpisodeList>
            {episodes.map((episode: SimplifiedEpisode) => (
              <EpisodeRow
                key={episode.id}
                onClick={() => navigate(`/episode/${episode.id}`)}
              >
                <Thumb
                  src={episode.images?.[0]?.url ?? ""}
                  alt={episode.name}
                />
                <EpisodeBody>
                  <EpisodeTitle>{episode.name}</EpisodeTitle>
                  <EpisodeShow>{show.name}</EpisodeShow>
                  <EpisodeDesc>{episode.description}</EpisodeDesc>
                  <EpisodeMeta>
                    {formatReleaseMeta(
                      episode.release_date,
                      episode.duration_ms,
                    )}
                  </EpisodeMeta>
                </EpisodeBody>
                <RowActions>
                  <EpisodePlus uri={episode.uri} />
                  <PlayCircle
                    aria-label="재생"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <PlayArrowIcon />
                  </PlayCircle>
                </RowActions>
              </EpisodeRow>
            ))}
            <Sentinel ref={ref} />
          </EpisodeList>
        )}
      </Column>

      <Column sx={{ order: { xs: 1, md: 2 } }}>
        <Typography variant="h3">상세정보</Typography>
        <DetailCard>
          <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
            {show.description || "설명이 없습니다."}
          </Typography>
          {show.publisher ? (
            <Typography fontSize={13} color="text.secondary">
              퍼블리셔 · {show.publisher}
            </Typography>
          ) : null}
          {typeof show.total_episodes === "number" ? (
            <Typography fontSize={13} color="text.secondary">
              에피소드 {show.total_episodes}개
            </Typography>
          ) : null}
        </DetailCard>
      </Column>
    </Layout>
  );
}
