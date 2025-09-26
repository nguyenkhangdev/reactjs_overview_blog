import { Layout as AntLayout } from "antd";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from 'react-router-dom'

const { Content } = AntLayout;

const PublicLayout = () => (
  <AntLayout style={{ minHeight: "100vh" }}>
    <Navbar /> 
    <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <Outlet />
    </Content>
    <Footer />
  </AntLayout>
);

export default PublicLayout;
