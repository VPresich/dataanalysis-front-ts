import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { ReactElement } from "react";

interface RestrictedRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/data",
}: RestrictedRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
