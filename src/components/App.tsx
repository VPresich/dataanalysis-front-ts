// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Toaster } from "react-hot-toast";
// import { resetRefreshState } from "../redux/auth/slice";
// import { refreshUser } from "../redux/auth/operations";
// import AppRouter from "./AppRouter";
// import AppBar from "./AppBar/AppBar";
// import Loader from "./UI/Loader/Loader";
// import {
//   errNotify,
//   successNotify,
// } from "../auxiliary/notification/notification";

// const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

// export default function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const initApp = async () => {
//       try {
//         await dispatch(refreshUser()).unwrap();
//         if (isDevMode) successNotify("Success refresh");
//       } catch {
//         if (isDevMode) errNotify("Error refresh");
//       } finally {
//         dispatch(resetRefreshState());
//       }
//     };

//     initApp();
//   }, [dispatch]);

//   return (
//     <>
//       <Loader />
//       <AppBar />
//       <AppRouter />
//       <Toaster position="top-right" reverseOrder={false} />
//     </>
//   );
// }

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { resetRefreshState } from "../redux/auth/slice";
import { refreshUser } from "../redux/auth/operations";
import AppRouter from "./AppRouter";
import AppBar from "./AppBar/AppBar";
import Loader from "./UI/Loader/Loader";
import {
  errNotify,
  successNotify,
} from "../auxiliary/notification/notification";
import type { AppDispatch } from "../redux/store";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(refreshUser()).unwrap();
        if (isDevMode) successNotify("Success refresh");
      } catch {
        if (isDevMode) errNotify("Error refresh");
      } finally {
        dispatch(resetRefreshState(false));
      }
    };

    void initApp();
  }, [dispatch]);

  return (
    <>
      <Loader />
      <AppBar />
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
