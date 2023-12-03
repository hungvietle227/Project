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
import { MDBIcon } from 'mdb-react-ui-kit';

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
      "Information",
      "g1",
      null,
      [getItem("Profile", "profile", <MDBIcon fas icon="user-cog" />)],
      "group"
    ),
    getItem(
      "Manage",
      "g2",
      null,
      [
        getItem("ZooTrainer", "/staff/1", <MDBIcon fas icon="chalkboard-teacher" />),
        getItem("Animal", "2", <MDBIcon fas icon="paw" />),

        getItem("Area", "/staff/area", <MDBIcon fas icon="map-marked-alt" />),
        getItem("Cage", "/staff/cage", <MDBIcon fas icon="archive" />),
        getItem("Food", "/staff/food", <MDBIcon fas icon="carrot" />),
        getItem("Schedule", "/staff/schedule", <MDBIcon fas icon="clipboard-list" />),
        getItem("Meal", "/staff/meal", <MDBIcon fas icon="utensils" />),

      ],
      "group"
    ),
  ]),
  getItem("Other", "sub2", <AppstoreOutlined />, [
    getItem("News", "news", <MDBIcon far icon="newspaper" />),getItem("Animal Species", "species", <MDBIcon fas icon="journal-whills" />), getItem("Food Category", "category", <MDBIcon fas icon="cookie-bite" />),
  ]),
  {
    type: "divider",
  },
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //     getItem("Option 9", "9"),
  //     getItem("Option 10", "10"),
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  // ])
];
const SideMenuStaff = ({ openSidebarToggle, OpenSidebar }) => {
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("");
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
      <div
        style={{
          backgroundColor: "bisque",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <Menu
          // theme="blue"
          style={{
            height: "140vh",
            backgroundColor: "wheat",
            borderRadius: "10px 10px 10px 10px",
          }}
          onClick={(item) => {
            //item.key
            navigate(item.key);
            setCurrent(item.key);
          }}
          selectedKeys={[current]}
          // defaultSelectedKeys={["profile"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>

      {/* </aside> */}
    </div>
  );
};
export default SideMenuStaff;
