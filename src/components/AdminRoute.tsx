import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUserState } from "../store/authAtom";

export default function AdminRoute() {
  const user = useRecoilValue(authUserState);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
