import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material";
import type { Ref } from "react";
import type { PlaylistItem } from "../../../types/playlistType";
import TrackItem from "./TrackItem";

const TableRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
});

const HeaderRow = styled("div")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 2,
  flexShrink: 0,
  display: "grid",
  gridTemplateColumns:
    "40px minmax(180px, 4fr) minmax(120px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr)",
  alignItems: "center",
  columnGap: 16,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "8px 16px",
  borderBottom: `1px solid ${theme.palette.background.black100}`,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "40px minmax(0, 1fr) auto",
    columnGap: 12,
    padding: "8px 12px",
    "& .tracks-header-album, & .tracks-header-added-at": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 8,
    padding: "6px 8px",
    "& .tracks-header-index": {
      display: "none",
    },
  },
}));

const HeaderCell = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  fontSize: 12,
  fontWeight: 400,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
}));

const IndexHeader = styled(HeaderCell)({
  justifyContent: "center",
  width: 40,
  textTransform: "none",
  fontSize: 14,
});

const DividedHeader = styled(HeaderCell)({ marginLeft: -4 });

const DurationHeader = styled(HeaderCell)({
  justifyContent: "center",
  gap: 2,
});

const durationIconSx = {
  fontSize: 18,
  color: "text.secondary",
} as const;

const sortIconSx = {
  fontSize: 20,
  color: "text.secondary",
  ml: -0.5,
} as const;

const TrackList = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  minWidth: 0,
  minHeight: 0,
  marginTop: 8,
  overflow: "auto",
});

const TrackRowWrap = styled("div")({
  width: "100%",
  minWidth: 0,
});

export default function Tracks({
  tracks,
  ref,
}: {
  tracks: PlaylistItem[];
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <TableRoot>
      <HeaderRow role="row">
        <IndexHeader className="tracks-header-index">#</IndexHeader>
        <HeaderCell>제목</HeaderCell>
        <DividedHeader className="tracks-header-album">앨범</DividedHeader>
        <DividedHeader className="tracks-header-added-at">
          추가한 날짜
        </DividedHeader>
        <DurationHeader>
          <AccessTimeIcon sx={durationIconSx} />
          <ArrowDropDownIcon sx={sortIconSx} />
        </DurationHeader>
      </HeaderRow>

      <TrackList>
        {tracks.map((track) => (
          <TrackRowWrap key={track.item.id}>
            <TrackItem track={track} />
          </TrackRowWrap>
        ))}
        <div ref={ref} />
      </TrackList>
    </TableRoot>
  );
}
