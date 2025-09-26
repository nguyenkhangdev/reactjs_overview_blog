import { Layout as AntLayout, Menu } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = AntLayout;

const AdminLayout = () => (
  <AntLayout style={{ minHeight: "100vh" }}>
    <Sider width={200} style={{ background: "#001529" }}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={[
          { key: "dashboard", label: "Dashboard" },
          { key: "posts", label: "Post Management" },
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

export default AdminLayout;
