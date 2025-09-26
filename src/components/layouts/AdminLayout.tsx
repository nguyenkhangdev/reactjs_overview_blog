import { Layout as AntLayout, Menu } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = AntLayout;

const AdminLayout = () => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#001529" }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} // highlight theo URL
          items={[
            { key: "/admin", label: <Link to="/admin">Dashboard</Link> },
            { key: "/admin/posts", label: <Link to="/admin/posts">Post Management</Link> },
          ]}
        />
      </Sider>
      <AntLayout>
        <Header style={{ background: "#fff", padding: 0 }}>Admin Header</Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Admin Footer ©2025</Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default AdminLayout;
