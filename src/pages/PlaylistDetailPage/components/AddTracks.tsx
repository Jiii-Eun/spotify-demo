import CloseIcon from "@mui/icons-material/Close";
import { IconButton, styled } from "@mui/material";
import SearchField from "../../../common/components/Search/SearchField";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
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
  flexShrink: 0,
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

export default function AddTracks({ playlistId }: { playlistId: string }) {
  return (
    <Root>
      <HeaderRow>
        <Title>플레이리스트에 추가할 곡을 찾아보세요</Title>
        <IconButton aria-label="닫기" sx={closeButtonSx}>
          <CloseIcon sx={closeIconSx} />
        </IconButton>
      </HeaderRow>

      <SearchField playlistId={playlistId} />
    </Root>
  );
}
