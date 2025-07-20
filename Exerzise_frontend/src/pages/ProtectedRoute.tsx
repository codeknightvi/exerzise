import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

interface protectedRouteprops {
  user?: "user" | "coach";
  children: React.ReactNode;
  redirectPath: string;
  isAllowed: boolean;
  accessibleRole: string | string[];
}
export const ProtectedRoute = ({
  user = "user",
  redirectPath,
  isAllowed,
  children,
  accessibleRole,
}: protectedRouteprops) => {
  const usernow = useAppSelector((state) => state.user);

  if (!accessibleRole.includes(user || usernow.role)) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
