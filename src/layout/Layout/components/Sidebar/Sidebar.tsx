import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material";
import EmptyPlayList from "./EmptyPlayList";

const SidebarHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
});

const SidebarTitle = styled("div")({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "35px",
});

export default function Sidebar() {
  return (
    <div>
      <SidebarHeader>
        <SidebarTitle>내 라이브러리</SidebarTitle>
        <AddIcon
          sx={(theme) => ({
            width: 35,
            height: 35,
            color: theme.palette.primary.main,
            cursor: "pointer",
            padding: "4px",
            borderRadius: "50%",
            backgroundColor: "#1f1f1f",
            "&:hover": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              transition: "all 0.3s ease",
            },
          })}
        />
      </SidebarHeader>
      <EmptyPlayList />
    </div>
  );
}
