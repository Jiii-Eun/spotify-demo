import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const LayoutContainer = styled("div")({});

const ContentContainer = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  gap: "8px",
  margin: "8px",
});

const SearchbarContainer = styled("div")({});
const SidebarContainer = styled("div")(({ theme }) => ({}));

export default function Layout() {
  return (
    <LayoutContainer className="layout-container">
      <SearchbarContainer>searchbar</SearchbarContainer>
      <ContentContainer>
        <SidebarContainer>sidebar</SidebarContainer>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
}
