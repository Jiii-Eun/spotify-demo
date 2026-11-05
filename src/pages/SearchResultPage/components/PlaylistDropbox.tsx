import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Typography, styled } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  useGetUserPlaylists,
  usePostAddPlaylistItems,
} from "../../../hooks/usePlaylist";
import type { Playlist } from "../../../types/playlistType";

const Panel = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  zIndex: 20,
  width: 320,
  maxHeight: 360,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 8,
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: theme.palette.background.black400,
  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
}));

const SearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 4,
  backgroundColor: theme.palette.background.black300,
  flexShrink: 0,
}));

const List = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  overscrollBehavior: "contain",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.background.black100,
    borderRadius: 8,
  },
}));

const Row = styled("button")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr)",
  alignItems: "center",
  columnGap: 12,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "8px 8px",
  border: "none",
  borderRadius: 4,
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  color: "inherit",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "default",
  },
}));

const Cover = styled("img")({
  width: 40,
  height: 40,
  borderRadius: 4,
  objectFit: "cover",
  flexShrink: 0,
  backgroundColor: "#282828",
});

const CoverFallback = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 4,
  flexShrink: 0,
  backgroundColor: theme.palette.background.black200,
}));

const ItemInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
});

const ItemTitle = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const ItemSubtitle = styled("div")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const Sentinel = styled("div")({
  width: "100%",
  height: 1,
});

const EmptyText = styled(Typography)(({ theme }) => ({
  padding: "12px 8px",
  color: theme.palette.text.secondary,
  fontSize: 13,
}));

type PlaylistDropboxProps = {
  trackUri: string;
  onClose: () => void;
  onAdded?: () => void;
};

export default function PlaylistDropbox({
  trackUri,
  onClose,
  onAdded,
}: PlaylistDropboxProps) {
  const [filter, setFilter] = useState("");
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUserPlaylists(10);

  const { mutate: addTrack, isPending: isAdding } = usePostAddPlaylistItems();

  const { ref, inView } = useInView({
    root: scrollRoot,
    rootMargin: "80px 0px",
    skip: !scrollRoot,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const playlists = useMemo(() => {
    const items =
      data?.pages.flatMap((page) => page.items).filter(Boolean) ?? [];
    const q = filter.trim().toLowerCase();
    if (!q) return items as Playlist[];
    return (items as Playlist[]).filter((playlist) =>
      playlist.name.toLowerCase().includes(q),
    );
  }, [data, filter]);

  const total = data?.pages[0]?.total ?? 0;
  const showSearch = total > 10;

  const handleSelect = (playlistId: string) => {
    if (isAdding) return;
    addTrack(
      { playlistId, uri: trackUri },
      {
        onSuccess: () => {
          onClose();
          onAdded?.();
        },
      },
    );
  };

  return (
    <Panel
      role="menu"
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
    >
      {showSearch ? (
        <SearchBox>
          <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <InputBase
            placeholder="플레이리스트 검색"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            sx={{
              flex: 1,
              fontSize: 13,
              color: "text.primary",
              "& .MuiInputBase-input": { padding: 0 },
            }}
            inputProps={{ "aria-label": "플레이리스트 검색" }}
          />
        </SearchBox>
      ) : null}

      <List ref={setScrollRoot}>
        {isLoading ? (
          <EmptyText>불러오는 중…</EmptyText>
        ) : playlists.length === 0 ? (
          <EmptyText>플레이리스트가 없습니다.</EmptyText>
        ) : (
          playlists.map((playlist) => {
            const imageUrl = playlist.images?.[0]?.url ?? "";
            const owner =
              playlist.owner?.display_name ?? playlist.owner?.id ?? "";

            return (
              <Row
                key={playlist.id}
                type="button"
                disabled={isAdding}
                onClick={() => handleSelect(playlist.id)}
              >
                {imageUrl ? (
                  <Cover src={imageUrl} alt="" />
                ) : (
                  <CoverFallback aria-hidden />
                )}
                <ItemInfo>
                  <ItemTitle>{playlist.name}</ItemTitle>
                  {owner ? <ItemSubtitle>{owner}</ItemSubtitle> : null}
                </ItemInfo>
              </Row>
            );
          })
        )}
        <Sentinel ref={ref} />
      </List>
    </Panel>
  );
}
