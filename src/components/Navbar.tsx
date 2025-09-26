import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => (
  <Header>
    <Menu theme="dark" mode="horizontal" selectable={false}>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="admin">
        <Link to="/admin">Admin</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;
