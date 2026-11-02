import type { InfiniteData } from "@tanstack/react-query";
import type { GetPlaylistItemsResponse } from "../../../types/playlistType";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { IconButton, styled } from "@mui/material";
import SearchField from "../../../common/components/Search/SearchField";
import Tracks from "./Tracks";
import CloseIcon from "@mui/icons-material/Close";

const ContentRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
});

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "24px 24px 16px",
  borderTop: `1px solid ${theme.palette.background.black100}`,
  backgroundColor: theme.palette.background.paper,
}));

const HeaderRow = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  width: "100%",
  minWidth: 0,
});

const Title = styled("h2")(({ theme }) => ({
  margin: 0,
  flex: 1,
  minWidth: 0,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.3,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

const closeButtonSx = {
  color: "text.primary",
  padding: 0.5,
  flexShrink: 0,
  "&:hover": {
    backgroundColor: "transparent",
    color: "text.secondary",
  },
};

const closeIconSx = {
  fontSize: 24,
};

export default function PlaylistDetailContent({
  id,
  playlistItems,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  id: string;
  playlistItems: InfiniteData<GetPlaylistItemsResponse>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tracks = playlistItems?.pages.flatMap((page) => page.items);

  const trackTotal = tracks?.length;

  return (
    <ContentRoot id={id}>
      {trackTotal === 0 ? (
        <Root>
          <HeaderRow>
            <Title>플레이리스트에 추가할 곡을 찾아보세요</Title>
            <IconButton aria-label="닫기" sx={closeButtonSx}>
              <CloseIcon sx={closeIconSx} />
            </IconButton>
          </HeaderRow>
          <SearchField playlistId={id} />
        </Root>
      ) : (
        <Tracks tracks={tracks} ref={ref} />
      )}
    </ContentRoot>
  );
}
