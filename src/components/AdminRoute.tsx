import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAdminSelector, authLoadingState } from "../store/authAtom";

export default function AdminRoute() {
  const isAdmin = useRecoilValue(isAdminSelector);
  const loading = useRecoilValue(authLoadingState);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
