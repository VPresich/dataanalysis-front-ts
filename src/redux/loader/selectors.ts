import { RootState } from "../store";
export const selectLoader = (state: RootState) => state.loader.loading;
