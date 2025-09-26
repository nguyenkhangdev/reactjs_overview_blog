import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAdminSelector } from "../store/authAtom";

export default function AdminRoute() {
  const isAdmin = useRecoilValue(isAdminSelector);

  if (!isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
