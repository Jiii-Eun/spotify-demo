import SearchIcon from "@mui/icons-material/Search";
import { InputBase, styled } from "@mui/material";
import { useState } from "react";
import { useGetSearch } from "../../../hooks/useSearch";
import { usePostAddPlaylistItems } from "../../../hooks/usePlaylist";
import type { SearchType } from "../../../types/searchType";
import SearchTypeFilter from "./SearchTypeFilter";
import SearchDropdown from "./SearchDropdown";
import { SEARCH_TYPE_OPTIONS_MAP } from "../../../configs/searchConfig";
import getSpotifyAuthUrl from "../../../utils/auth";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  minWidth: 0,
});

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
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
};

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
};

export default function SearchField({ playlistId }: { playlistId: string }) {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("track");

  const {
    data: searchResults,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSearch({
    q: keyword,
    type: searchType,
  });

  const { mutate: addTrack, isPending: isAdding } =
    usePostAddPlaylistItems(playlistId);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleAddTrack = (uri: string) => {
    if (isAdding) return;

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      getSpotifyAuthUrl();
      return;
    }

    addTrack(uri, {
      onError: () => {
        getSpotifyAuthUrl();
      },
    });
  };

  const checkType = SEARCH_TYPE_OPTIONS_MAP[searchType];

  const pages = searchResults?.pages ?? [];

  return (
    <Root>
      <SearchContainer>
        <SearchTypeFilter value={searchType} onChange={setSearchType} />
        <SearchIcon sx={searchIconSx} />
        <InputBase
          placeholder="곡 또는 에피소드 검색하기"
          inputProps={{ "aria-label": "곡 또는 에피소드 검색하기" }}
          sx={searchInputSx}
          value={keyword}
          onChange={handleSearchKeyword}
        />
      </SearchContainer>

      {searchResults && (
        <SearchDropdown
          searchResults={pages}
          checkType={checkType}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onAddTrack={handleAddTrack}
          isAdding={isAdding}
        />
      )}
    </Root>
  );
}
