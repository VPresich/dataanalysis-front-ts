import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
import { ReactElement } from "react";

interface PrivateRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export default function PrivateRoute({
  component: Component,
  redirectTo = "/example",
}: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
}
