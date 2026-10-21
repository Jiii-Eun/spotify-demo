import styled from "@emotion/styled";
import MusicCardList from "./MusicCardList";
import { Typography } from "@mui/material";

const RizeMusic = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export default function MusicCardSection({ title }: { title: string }) {
  return (
    <RizeMusic>
      <Typography variant="h3">{title}</Typography>
      <MusicCardList />
    </RizeMusic>
  );
}
