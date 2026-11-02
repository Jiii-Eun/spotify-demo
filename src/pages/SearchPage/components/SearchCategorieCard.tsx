import { styled } from "@mui/material";
import type { SearchType } from "../../../types/searchType";
import { categoryColor } from "../../../utils/color";
import { CATEGORY_IMAGES } from "../../../configs/imageCondig";

const CardRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 2",
  overflow: "hidden",
  borderRadius: 8,
  backgroundColor: bgColor,
  cursor: "default",
  userSelect: "none",
}));

const Title = styled("div")({
  position: "relative",
  zIndex: 1,
  padding: "16px",
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1.25,
  color: "#fff",
  wordBreak: "keep-all",
});

const Cover = styled("img")({
  position: "absolute",
  right: -18,
  bottom: -14,
  width: 100,
  height: 100,
  borderRadius: 8,
  objectFit: "cover",
  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
  transform: "rotate(25deg)",
});

export default function SearchCategorieCard({
  type,
  name,
}: {
  type: SearchType;
  name: string;
}) {
  const bgColor = categoryColor(type);
  const imageUrl = CATEGORY_IMAGES[type];

  return (
    <CardRoot bgColor={bgColor}>
      <Title>{name}</Title>
      <Cover src={imageUrl} alt="" aria-hidden />
    </CardRoot>
  );
}
