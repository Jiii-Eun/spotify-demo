import { styled } from "@mui/material";
import { SEARCH_TYPE_OPTIONS } from "../../../configs/searchConfig";
import SearchCategorieCard from "./SearchCategorieCard";

const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 20,
  width: "100%",
  minWidth: 0,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
}));

export default function SearchCategorieList() {
  return (
    <Grid>
      {SEARCH_TYPE_OPTIONS.map(({ value, label }) => (
        <SearchCategorieCard key={value} type={value} name={label} />
      ))}
    </Grid>
  );
}
