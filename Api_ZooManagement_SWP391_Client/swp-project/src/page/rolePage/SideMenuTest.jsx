import React from "react";
import { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  AlertOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Switch, Divider } from "antd";
import { MDBIcon } from "mdb-react-ui-kit";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Zoo Management", "sub1", <AlertOutlined />, [
    getItem(
      "User",
      "g1",
      null,
      [getItem("User", "1", <MDBIcon fas icon="user-cog" />)],
      "group"
    ),
    getItem(
      "Manage",
      "g2",
      null,
      [
        getItem("Dashboard", "3", <MDBIcon fas icon="cash-register" />),
        getItem("Animal", "2", <MDBIcon fas icon="paw" />),
        getItem("News", "news", <MDBIcon fas icon="newspaper" />),
      ],
      "group"
    ),
  ]),
  getItem("Cage & Area", "sub2", <AppstoreOutlined />, [
    getItem("View Area", "/admin/area", <MDBIcon fas icon="map" />),
    getItem("View Cage", "/admin/cage", <MDBIcon fas icon="archive" />),
    getItem(
      "View FeedBack",
      "/admin/feedback",
      <MDBIcon fas icon="comment-alt" />
    ),
  ]),
];
const SideMenuTest = ({ openSidebarToggle, OpenSidebar }) => {
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("1");
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div
      className={openSidebarToggle ? "sidebar-responsive" : "Slide-Container"}
    >
      {/* <aside
        id="sidebar"
      > */}
      {/* <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style={{ margin: "10px" }}
      /> */}
      <Menu
        // theme="blue"
        style={{
          height: "89rem",
          backgroundColor: "wheat",
          borderRadius: "10px 10px 10px 10px",
        }}
        onClick={(item) => {
          //item.key
          navigate(item.key);
          setCurrent(item.key);
        }}
        // selectedKeys={[current]}
        // defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />

      {/* </aside> */}
    </div>
  );
};
export default SideMenuTest;
