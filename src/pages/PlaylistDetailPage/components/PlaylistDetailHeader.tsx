import EditIcon from "@mui/icons-material/Edit";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Avatar, styled } from "@mui/material";
import { useGetUserPlaylists } from "../../../hooks/usePlaylist";
import { useGetCurrentUserProfile } from "../../../hooks/useUser";
import type { GetPlaylistItemsResponse } from "../../../types/playlistType";

const HeaderRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "hasCover",
})<{ hasCover: boolean }>(({ theme, hasCover }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 24,
  width: "100%",
  minWidth: 0,
  padding: "24px 24px 20px",
  boxSizing: "border-box",
  background: hasCover
    ? `linear-gradient(
        180deg,
        ${theme.palette.primary.main}55 0%,
        ${theme.palette.background.paper} 100%
      )`
    : `linear-gradient(
        180deg,
        ${theme.palette.background.black300} 0%,
        ${theme.palette.background.paper} 100%
      )`,
}));

const Cover = styled("div")(({ theme }) => ({
  position: "relative",
  flexShrink: 0,
  width: 192,
  height: 192,
  borderRadius: 4,
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: theme.palette.background.black200,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover .cover-overlay": {
    opacity: 1,
  },
  "&:hover .cover-image": {
    filter: "brightness(0.4)",
  },
  "&:hover .cover-placeholder": {
    opacity: 0,
  },
  [theme.breakpoints.down("md")]: {
    width: 152,
    height: 152,
  },
}));

const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "filter 0.2s ease",
  borderRadius: 0,
});

const CoverPlaceholderIcon = styled(MusicNoteIcon)(({ theme }) => ({
  fontSize: 72,
  color: theme.palette.text.secondary,
  transition: "opacity 0.2s ease",
}));

const CoverOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  opacity: 0,
  transition: "opacity 0.2s ease",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  color: theme.palette.text.primary,
}));

const CoverOverlayIcon = styled(EditIcon)({
  fontSize: 40,
});

const CoverOverlayText = styled("div")({
  fontSize: 14,
  fontWeight: 700,
});

const Info = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 10,
  minWidth: 0,
  flex: 1,
  paddingBottom: 4,
});

const TypeLabel = styled("div")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const Title = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: 56,
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    fontSize: 36,
  },
}));

const Meta = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
  flexWrap: "wrap",
});

const OwnerAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  fontSize: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const OwnerName = styled("span")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const MetaText = styled("span")(({ theme }) => ({
  fontSize: 13,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export default function PlaylistDetailHeader({
  id,
  playlistItems,
}: {
  id: string;
  playlistItems?: GetPlaylistItemsResponse;
}) {
  const { data: userProfile } = useGetCurrentUserProfile();
  const { data: userPlaylists } = useGetUserPlaylists(10);

  // Items API에는 name/images/owner가 없어 사이드바와 같은 유저 플레이리스트에서 메타 조회
  const playlist = userPlaylists?.pages
    .flatMap((page) => page.items)
    .find((item) => item.id === id);

  const coverUrl = playlist?.images?.[0]?.url;
  const hasCover = !!coverUrl;
  const trackTotal = playlistItems?.total ?? playlist?.tracks?.total ?? 0;
  const hasTracks = trackTotal > 0;
  const ownerName =
    playlist?.owner?.display_name ??
    userProfile?.display_name ??
    playlist?.owner?.id ??
    "";
  const ownerImage = userProfile?.images?.[0]?.url;
  const typeLabel =
    playlist?.public === false ? "비공개 플레이리스트" : "공개 플레이리스트";

  return (
    <HeaderRoot hasCover={hasCover}>
      <Cover>
        {hasCover ? (
          <CoverImage
            className="cover-image"
            src={coverUrl}
            alt={playlist?.name}
          />
        ) : (
          <CoverPlaceholderIcon className="cover-placeholder" />
        )}
        <CoverOverlay className="cover-overlay">
          <CoverOverlayIcon />
          <CoverOverlayText>사진 선택</CoverOverlayText>
        </CoverOverlay>
      </Cover>

      <Info>
        <TypeLabel>{typeLabel}</TypeLabel>
        <Title>{playlist?.name ?? "플레이리스트"}</Title>
        <Meta>
          <OwnerAvatar src={ownerImage} alt={ownerName} />
          <OwnerName>{ownerName}</OwnerName>
          {hasTracks && <MetaText>• {trackTotal}곡</MetaText>}
        </Meta>
      </Info>
    </HeaderRoot>
  );
}
