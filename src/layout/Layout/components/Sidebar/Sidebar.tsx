import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material";
import EmptyPlayList from "./EmptyPlayList";
import { usePlaylist } from "../../../../hooks/usePlaylist";
import ErrorMessage from "../../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../../common/components/LoadingSpinner/LoadingSpinner";
import PlayList from "./PlayList";
import type { InfiniteData } from "@tanstack/react-query";
import type { PlaylistResponse } from "../../../../types/playlistType";

const SidebarRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
});

const SidebarHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  padding: "8px 8px 16px",
});

const SidebarTitle = styled("div")({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "35px",
});

const AddButton = styled(AddIcon)(({ theme }) => ({
  width: 35,
  height: 35,
  color: theme.palette.primary.main,
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.black500,
  "&:hover": {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
}));

const PlayListArea = styled("div")(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.background.black100,
    borderRadius: 8,
  },
}));

export default function Sidebar() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePlaylist({
    offset: 0,
    limit: 10,
  });

  console.log("플레이리스트:", data);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SidebarRoot>
      <SidebarHeader>
        <SidebarTitle>내 라이브러리</SidebarTitle>
        <AddButton />
      </SidebarHeader>
      <PlayListArea>
        {data?.pages[0]?.items.length === 0 || !data ? (
          <EmptyPlayList />
        ) : (
          <PlayList
            data={data as InfiniteData<PlaylistResponse>}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </PlayListArea>
    </SidebarRoot>
  );
}
