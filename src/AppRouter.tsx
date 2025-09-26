import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostManagement from "./pages/admin/PostManagement";
import Dashboard from "./pages/admin/Dashboard";

const AppRouter = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Route>

    {/* Admin routes */}
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/posts" element={<PostManagement />} />
    </Route>
  </Routes>
);

export default AppRouter;
