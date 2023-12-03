import React from "react";
import { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Switch, Divider } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
import { MDBIcon } from "mdb-react-ui-kit";

const items = [
  getItem("Zoo Management", "sub1", <AlertOutlined />, [
    getItem(
      "Manage",
      "g1",
      null,
      [
        getItem("Profile", "profile", <MDBIcon fas icon="user-cog" />),
        getItem("Animal", "2", <MDBIcon fas icon="paw" />),
      ],
      "group"
    ),
    getItem(
      "Other",
      "g2",
      null,
      [
        getItem("Food", "food", <MDBIcon fas icon="carrot" />),
        getItem("Feeding", "feed", <MDBIcon fas icon="utensils" />),
        getItem(
          "Schedule Animal",
          "scheduleAnimal",
          <MDBIcon fas icon="utensils" />
        ),
      ],
      "group"
    ),
  ]),
];
const SideMenuZooTrainer = ({ openSidebarToggle, OpenSidebar }) => {
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
          height: "148vh",
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
export default SideMenuZooTrainer;
