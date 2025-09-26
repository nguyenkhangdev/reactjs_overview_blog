import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authUserState } from "../store/authAtom";
import { Header } from "antd/es/layout/layout";

export default function Navbar() {
  const [user, setUser] = useRecoilState(authUserState);
  const navigate = useNavigate();

  console.log("user", user);
  const handleSignOut = () => {
    localStorage.removeItem("auth-token");
    setUser(null); // reset user recoil
    navigate("/signin");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        style={{ flex: 1 }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="admin">
          <Link to="/admin">Admin</Link>
        </Menu.Item>
      </Menu>

      {/* Right Section */}
      <div>
        {user ? (
          <>
            <span style={{ color: "white" }}>
              👋 Hello, <b>{user.email}</b>
            </span>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <Link to="/signin">
            <Button type="primary">Sign In</Button>
          </Link>
        )}
      </div>
    </Header>
  );
}
