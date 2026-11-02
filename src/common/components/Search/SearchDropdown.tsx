import { Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type {
  SearchInfiniteData,
  SearchResponse,
} from "../../../types/searchType";
import { toSearchRows } from "../../../utils/searchDataFillter";

const List = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  maxHeight: 360,
  overflowY: "auto",
  overscrollBehavior: "contain",
  [theme.breakpoints.down("sm")]: {
    maxHeight: 280,
  },
}));

const Row = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1.4fr) minmax(0, 1fr) auto",
  alignItems: "center",
  columnGap: 16,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "8px 8px",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    columnGap: 12,
    "& .search-meta": {
      display: "none",
    },
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
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const ItemSubtitle = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const ItemMeta = styled("div")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const AddButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  flexShrink: 0,
  padding: "4px 14px",
  borderRadius: 999,
  border: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.4,
  textTransform: "none",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.background.black100,
    borderColor: theme.palette.text.primary,
  },
  "&.Mui-disabled": {
    borderColor: theme.palette.text.secondary,
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },
}));

const Sentinel = styled("div")({
  width: "100%",
  height: 1,
});

export default function SearchDropdown({
  searchResults,
  checkType,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onAddTrack,
  isAdding,
}: {
  searchResults: SearchInfiniteData;
  checkType: keyof SearchResponse;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onAddTrack?: (uri: string) => void;
  isAdding?: boolean;
}) {
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    root: scrollRoot,
    rootMargin: "80px 0px",
  });
  const rows = toSearchRows(checkType, searchResults.pages);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (rows.length === 0) return null;

  return (
    <List ref={setScrollRoot}>
      {rows.map((row) => {
        const canAdd = Boolean(row.uri && onAddTrack);

        return (
          <Row key={row.key}>
            {row.imageUrl ? (
              <Cover src={row.imageUrl} alt="" />
            ) : (
              <CoverFallback aria-hidden />
            )}
            <ItemInfo>
              <ItemTitle>{row.title}</ItemTitle>
              {row.subtitle ? <ItemSubtitle>{row.subtitle}</ItemSubtitle> : null}
            </ItemInfo>
            <ItemMeta className="search-meta">{row.meta ?? ""}</ItemMeta>
            <AddButton
              disableRipple
              disabled={!canAdd || isAdding}
              onClick={() => {
                if (!row.uri || !onAddTrack) return;
                onAddTrack(row.uri);
              }}
            >
              추가하기
            </AddButton>
          </Row>
        );
      })}
      <Sentinel ref={ref} />
    </List>
  );
}
