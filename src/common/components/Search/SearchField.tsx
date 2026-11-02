import SearchIcon from "@mui/icons-material/Search";
import { InputBase, styled } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetSearch } from "../../../hooks/useSearch";
import { usePostAddPlaylistItems } from "../../../hooks/usePlaylist";
import type { SearchType } from "../../../types/searchType";
import SearchTypeFilter from "./SearchTypeFilter";
import SearchDropdown from "./SearchDropdown";
import { SEARCH_TYPE_OPTIONS_MAP } from "../../../configs/searchConfig";
import getSpotifyAuthUrl from "../../../utils/auth";

type SearchFieldVariant = "playlist" | "header" | "page";

type SearchFieldProps = {
  playlistId?: string;
  variant?: SearchFieldVariant;
  placeholder?: string;
};

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  minWidth: 0,
});

const SearchContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: SearchFieldVariant }>(({ theme, variant }) => {
  if (variant === "header") {
    return {
      display: "flex",
      alignItems: "center",
      gap: 8,
      width: "100%",
      minWidth: 0,
      maxWidth: 420,
      boxSizing: "border-box",
      padding: "8px 12px",
      backgroundColor: theme.palette.background.black400,
      border: "1px solid transparent",
      borderRadius: 999,
      "&:hover": {
        backgroundColor: theme.palette.background.black300,
        border: `1px solid ${theme.palette.background.black200}`,
      },
      "&:focus-within": {
        backgroundColor: theme.palette.background.black300,
        border: `1px solid ${theme.palette.secondary.main}`,
      },
    };
  }

  return {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    minWidth: 0,
    maxWidth: variant === "page" ? 520 : undefined,
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: variant === "page" ? 999 : 4,
    backgroundColor: theme.palette.background.black300,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  };
});

const Divider = styled("div")({
  color: "#b3b3b3",
  display: "flex",
  alignItems: "center",
  lineHeight: 1,
  flexShrink: 0,
});

const SearchLink = styled(NavLink)(({ theme }) => ({
  fontSize: 16,
  width: 38,
  flexShrink: 0,
  color: "#b3b3b3",
  textDecoration: "none",
  "&:hover": { color: theme.palette.primary.main },
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
    textOverflow: "ellipsis",
    "&::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
  },
};

export default function SearchField({
  playlistId,
  variant = "playlist",
  placeholder,
}: SearchFieldProps) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("track");

  const isPlaylistMode = variant === "playlist" && !!playlistId;

  const {
    data: searchResults,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSearch({
    q: isPlaylistMode ? keyword : "",
    type: searchType,
  });

  const { mutate: addTrack, isPending: isAdding } = usePostAddPlaylistItems(
    playlistId ?? "",
  );

  const resolvedPlaceholder =
    placeholder ??
    (variant === "header" || variant === "page"
      ? "원하는 음악을 검색하세요"
      : "곡 또는 에피소드 검색하기");

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleNavigateSearch = () => {
    const q = keyword.trim();
    if (!q) {
      navigate("/search");
      return;
    }
    navigate(`/search/${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (variant === "header" || variant === "page") {
      event.preventDefault();
      handleNavigateSearch();
    }
  };

  const handleAddTrack = (uri: string) => {
    if (!playlistId || isAdding) return;

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
      <SearchContainer variant={variant}>
        {isPlaylistMode ? (
          <SearchTypeFilter value={searchType} onChange={setSearchType} />
        ) : null}
        <SearchIcon
          sx={(theme) => ({
            ...searchIconSx,
            ...(variant === "header" && {
              color: "#b3b3b3",
              "&:hover": { scale: 1.1, color: theme.palette.primary.main },
            }),
          })}
        />
        <InputBase
          placeholder={resolvedPlaceholder}
          inputProps={{ "aria-label": resolvedPlaceholder }}
          sx={searchInputSx}
          value={keyword}
          onChange={handleSearchKeyword}
          onKeyDown={handleKeyDown}
        />
        {variant === "header" ? (
          <>
            <Divider>|</Divider>
            <SearchLink to="/search">검색</SearchLink>
          </>
        ) : null}
      </SearchContainer>

      {isPlaylistMode && searchResults ? (
        <SearchDropdown
          searchResults={pages}
          checkType={checkType}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onAddTrack={handleAddTrack}
          isAdding={isAdding}
        />
      ) : null}
    </Root>
  );
}
