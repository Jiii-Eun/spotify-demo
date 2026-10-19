import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div>
      <div>sidebar</div>
      <Outlet />
    </div>
  );
}
