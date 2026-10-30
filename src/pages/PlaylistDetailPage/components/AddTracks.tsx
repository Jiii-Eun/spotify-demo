import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, styled } from "@mui/material";
import { useState } from "react";
import SearchResultPage from "../../SearchResultPage/SearchResultPage";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
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

const SearchField = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  maxWidth: 420,
  minWidth: 0,
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: 4,
  backgroundColor: theme.palette.background.black300,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const searchIconSx = {
  fontSize: 20,
  color: "text.secondary",
  flexShrink: 0,
} as const;

const searchInputSx = {
  flex: 1,
  minWidth: 0,
  fontSize: 14,
  color: "text.primary",
  "& .MuiInputBase-input": {
    padding: 0,
    "&::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
  },
} as const;

const closeButtonSx = {
  color: "text.primary",
  padding: 0.5,
  flexShrink: 0,
  "&:hover": {
    backgroundColor: "transparent",
    color: "text.secondary",
  },
} as const;

const closeIconSx = {
  fontSize: 24,
} as const;

export default function AddTracks() {
  const [keyword, setKeyword] = useState("");

  const { data: searchResults } = useGetSearch({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <Root>
      <HeaderRow>
        <Title>플레이리스트에 추가할 곡을 찾아보세요</Title>
        <IconButton aria-label="닫기" sx={closeButtonSx}>
          <CloseIcon sx={closeIconSx} />
        </IconButton>
      </HeaderRow>

      <SearchField>
        <SearchIcon sx={searchIconSx} />
        <InputBase
          placeholder="곡 또는 에피소드 검색하기"
          inputProps={{ "aria-label": "곡 또는 에피소드 검색하기" }}
          sx={searchInputSx}
          value={keyword}
          onChange={handleSearchKeyword}
        />
      </SearchField>

      {searchResults?.tracks.items.map((track) => (
        <SearchResultPage key={track.id} searchResult={track} />
      ))}
    </Root>
  );
}
