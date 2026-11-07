import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Alert,
  IconButton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetAudiobookChapters } from "../../../hooks/useAudiobook";
import type {
  SimplifiedChapter,
  SpotifyAudiobook,
} from "../../../types/audiobookType";
import PlaylistDropbox from "../../SearchResultPage/components/PlaylistDropbox";

const Layout = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.6fr) minmax(240px, 0.9fr)",
  gap: 32,
  padding: "20px 24px 48px",
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
  gap: 20,
  minWidth: 0,
});

const Meta = styled("div")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}));

const Actions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

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

const PlusWrap = styled("div")({
  position: "relative",
});

const PlusCircle = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `1.5px solid ${theme.palette.text.secondary}`,
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
}));

const Narration = styled("div")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

const DescriptionBody = styled("div", {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ theme, expanded }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  ...(expanded
    ? {}
    : {
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }),
}));

const ExpandButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: 700,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ChapterList = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const ChapterRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: 16,
  padding: "16px 8px",
  borderBottom: `1px solid ${theme.palette.background.black200}`,
  borderRadius: 8,
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
}));

const ChapterInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
});

const ChapterTitle = styled("div")(({ theme }) => ({
  fontSize: 15,
  fontWeight: 700,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const ChapterDuration = styled("div")(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}));

const ChapterPlay = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.text.primary,
    filter: "brightness(0.92)",
  },
}));

const SideCard = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  borderRadius: 8,
  backgroundColor: theme.palette.background.black300,
}));

const SideCover = styled("img")(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 6,
  objectFit: "cover",
  backgroundColor: theme.palette.background.black200,
  flexShrink: 0,
}));

const SideInfo = styled("div")({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const RatingPill = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  padding: "8px 14px",
  borderRadius: 999,
  border: `1px solid ${theme.palette.background.black100}`,
  color: theme.palette.text.secondary,
  fontSize: 13,
  fontWeight: 600,
}));

const Sentinel = styled("div")({
  height: 1,
  width: "100%",
});

function formatDurationLong(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

type AudiobookDetailContentsProps = {
  audiobook: SpotifyAudiobook;
};

export default function AudiobookDetailContents({
  audiobook,
}: AudiobookDetailContentsProps) {
  const plusRootRef = useRef<HTMLDivElement>(null);
  const [dropboxOpen, setDropboxOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    severity: "error" | "success";
    message: string;
  }>({ open: false, severity: "error", message: "" });

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAudiobookChapters(audiobook.id, 20);

  const { ref, inView } = useInView({ rootMargin: "120px 0px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!dropboxOpen) return;
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = plusRootRef.current?.contains(target);
      const inMenu =
        target instanceof Element &&
        Boolean(target.closest('[role="menu"]'));
      if (!inTrigger && !inMenu) {
        setDropboxOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropboxOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropboxOpen]);

  const chapters =
    data?.pages.flatMap((page) => page.items?.filter(Boolean) ?? []) ?? [];

  const totalDurationMs = useMemo(
    () => chapters.reduce((sum, chapter) => sum + (chapter.duration_ms ?? 0), 0),
    [chapters],
  );

  const narrators =
    audiobook.narrators?.map((n) => n.name).filter(Boolean).join(", ") ?? "";
  const coverUrl = audiobook.images?.[0]?.url ?? "";
  const firstChapterDuration = chapters[0]?.duration_ms;

  const metaParts = [
    audiobook.total_chapters
      ? `챕터 ${audiobook.total_chapters}개`
      : null,
    totalDurationMs > 0 ? formatDurationLong(totalDurationMs) : null,
  ].filter(Boolean);

  return (
    <Layout>
      <Column sx={{ order: { xs: 2, md: 1 } }}>
        {metaParts.length ? <Meta>{metaParts.join(" · ")}</Meta> : null}

        <Actions>
          <PlayCircle aria-label="재생">
            <PlayArrowIcon sx={{ fontSize: 32 }} />
          </PlayCircle>
          <PlusWrap ref={plusRootRef}>
            <PlusCircle
              aria-label="플레이리스트에 추가"
              onClick={() => {
                const accessToken = localStorage.getItem("access_token");
                if (!accessToken) {
                  setDropboxOpen(false);
                  setToast({
                    open: true,
                    severity: "error",
                    message: "로그인 후 이용해주세요",
                  });
                  return;
                }
                setDropboxOpen((prev) => !prev);
              }}
            >
              <AddIcon fontSize="small" />
            </PlusCircle>
            {dropboxOpen ? (
              <PlaylistDropbox
                trackUri={audiobook.uri}
                anchorEl={plusRootRef.current}
                onClose={() => setDropboxOpen(false)}
                onAdded={() =>
                  setToast({
                    open: true,
                    severity: "success",
                    message: "플레이리스트에 추가되었습니다",
                  })
                }
              />
            ) : null}
          </PlusWrap>
        </Actions>

        {narrators ? <Narration>내레이션: {narrators}</Narration> : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <DescriptionBody expanded={descExpanded}>
            {audiobook.description || "설명이 없습니다."}
          </DescriptionBody>
          {audiobook.description ? (
            <ExpandButton
              type="button"
              onClick={() => setDescExpanded((prev) => !prev)}
            >
              {descExpanded ? "접기" : "...더 표시하기"}
            </ExpandButton>
          ) : null}
        </div>

        <Typography variant="h3">챕터</Typography>
        {isLoading ? (
          <Typography color="text.secondary">불러오는 중…</Typography>
        ) : (
          <ChapterList>
            {chapters.map((chapter: SimplifiedChapter) => (
              <ChapterRow key={chapter.id}>
                <ChapterInfo>
                  <ChapterTitle>{chapter.name}</ChapterTitle>
                  <ChapterDuration>
                    {formatDurationLong(chapter.duration_ms)}
                  </ChapterDuration>
                </ChapterInfo>
                <ChapterPlay aria-label="재생">
                  <PlayArrowIcon fontSize="small" />
                </ChapterPlay>
              </ChapterRow>
            ))}
            <Sentinel ref={ref} />
          </ChapterList>
        )}
      </Column>

      <Column sx={{ order: { xs: 1, md: 2 } }}>
        <SideCard>
          <SideCover src={coverUrl} alt={audiobook.name} />
          <SideInfo>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: 14 }}>
              {audiobook.name}
            </Typography>
            <Typography color="text.secondary" noWrap sx={{ fontSize: 12 }}>
              {firstChapterDuration
                ? `샘플 ${formatDurationLong(firstChapterDuration)}`
                : `챕터 ${audiobook.total_chapters ?? 0}개`}
            </Typography>
          </SideInfo>
        </SideCard>
        <RatingPill>
          <StarBorderIcon sx={{ fontSize: 18 }} />
          평점 없음
        </RatingPill>
      </Column>

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
    </Layout>
  );
}
