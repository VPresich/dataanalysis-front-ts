import { RootState } from "../store";
export const selectSidebarOpen = (state: RootState) => state.sidebar.isOpen;
