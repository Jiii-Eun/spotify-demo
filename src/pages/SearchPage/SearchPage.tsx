import { styled } from "@mui/material";
import SearchField from "../../common/components/Search/SearchField";
import SearchCategorieList from "./components/SearchCategorieList";

const PageRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  width: "100%",
  minWidth: 0,
  minHeight: "100%",
  boxSizing: "border-box",
  padding: "24px 28px 40px",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "16px 16px 32px",
    gap: 20,
  },
}));

const Title = styled("h2")(({ theme }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.3,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

export default function SearchPage() {
  return (
    <PageRoot>
      <SearchField variant="page" />
      <Title>모두 둘러보기</Title>
      <SearchCategorieList />
    </PageRoot>
  );
}
