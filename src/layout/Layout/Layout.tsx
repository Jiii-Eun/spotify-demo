import { alpha, Box, Drawer, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "calc(100dvh - 80px)",
  gap: "8px",
  margin: "8px",
  minHeight: 0,
  [theme.breakpoints.down("sm")]: {
    margin: "4px",
    gap: 0,
    height: "calc(100dvh - 72px)",
  },
}));

const HeaderContainer = styled("div")(({ theme }) => ({
  height: "64px",
  width: "100%",
  padding: "8px 8px 0 8px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    height: "56px",
    padding: "4px 4px 0 4px",
  },
}));

const SidebarContainer = styled("div")(({ theme }) => ({
  flex: "1",
  minWidth: 226,
  minHeight: 0,
  height: "100%",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentContainerOutlet = styled("div")(({ theme }) => ({
  flex: "3.5",
  minWidth: 0,
  minHeight: 0,
  height: "100%",
  overflow: "auto",
  background: `linear-gradient(
    176deg,
    ${alpha(theme.palette.primary.main, 0.1)} 0%,
    ${theme.palette.background.paper} 18%
  )`,
}));

const ContentBox = styled("div")(({ theme }) => ({
  minWidth: "0",
  width: "100%",
  height: "100%",
  padding: "8px",
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    padding: "8px 4px",
  },
}));

const DrawerPaper = styled(Box)(({ theme }) => ({
  width: 280,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxSizing: "border-box",
  padding: 8,
}));

export default function Layout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <HeaderContainer>
        <Header onOpenSidebar={() => setDrawerOpen(true)} />
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <DrawerPaper>
          <Sidebar />
        </DrawerPaper>
      </Drawer>
    </div>
  );
}
