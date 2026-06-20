import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import css from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={css.container}>
      <SideBar />
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}
