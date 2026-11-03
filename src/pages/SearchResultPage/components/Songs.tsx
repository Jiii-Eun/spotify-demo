import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SearchTrack } from "../../../types/searchType";

const Section = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  minWidth: 0,
});

const List = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const Row = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.background.black300,
  },
}));

const Thumb = styled("img")({
  width: 40,
  height: 40,
  borderRadius: 4,
  objectFit: "cover",
  flexShrink: 0,
});

const TextStack = styled("div")({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const Title = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 14,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Subtitle = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 13,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Duration = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 13,
  flexShrink: 0,
  fontVariantNumeric: "tabular-nums",
}));

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type SongsProps = {
  tracks: SearchTrack[];
};

export default function Songs({ tracks }: SongsProps) {
  if (!tracks.length) return null;

  return (
    <Section>
      <Typography variant="h3">Songs</Typography>
      <List>
        {tracks.map((track) => {
          const imageUrl = track.album?.images?.[0]?.url ?? "";
          const artistName = track.artists?.map((a) => a.name).join(", ") ?? "";

          return (
            <Row key={track.id}>
              <Thumb src={imageUrl} alt={track.name} />
              <TextStack>
                <Title>{track.name}</Title>
                <Subtitle>{artistName}</Subtitle>
              </TextStack>
              <Duration>{formatDuration(track.duration_ms)}</Duration>
            </Row>
          );
        })}
      </List>
    </Section>
  );
}
