import { alpha, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const ContentContainer = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
  gap: "8px",
  margin: "8px",
});

const HeaderContainer = styled("div")({
  height: "64px",
  width: "100%",
  padding: "8px 8px 0 8px",
});

const SidebarContainer = styled("div")(({ theme }) => ({
  flex: "1",
  minWidth: 226,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentContainerOutlet = styled("div")(({ theme }) => ({
  flex: "3.5",
  minWidth: 0,
  background: `linear-gradient(
    176deg,
    ${alpha(theme.palette.primary.main, 0.1)} 0%,
    ${theme.palette.background.paper} 18%
  )`,
}));

const ContentBox = styled("div")(({ theme }) => ({
  minWidth: "0",
  width: "100%",
  padding: "8px",
  color: theme.palette.text.primary,
}));

export default function Layout() {
  return (
    <div>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <ContentContainer>
        <SidebarContainer>
          <ContentBox>
            <Sidebar />
          </ContentBox>
        </SidebarContainer>

        <ContentContainerOutlet>
          <ContentBox>
            <Outlet />
          </ContentBox>
        </ContentContainerOutlet>
      </ContentContainer>
    </div>
  );
}
