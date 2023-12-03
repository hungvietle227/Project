import React, { useState } from "react";
import AppHeader from "./page/rolePage/headerTest";
import SideMenuTest from "./page/rolePage/SideMenuTest";
import { Outlet } from "react-router-dom";
import "../src/assets/css/dashboard.css";
import AddFood from "./page/Food/AddFood";
import SliderHero from "./page/sliderHero";
import SideMenu from "./page/rolePage/test";
import { MDBIcon } from 'mdb-react-ui-kit';
function HeaderLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="App">
        <AppHeader OpenSidebar={OpenSidebar} />
        <div
          className="SideMenuAndPageContent"
          style={{ "background-color": 'ghostwhite' }}
        >
          <SideMenuTest
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          ></SideMenuTest>
          <Outlet></Outlet>
        </div>
        {/* <Footer
                style={{
                    textAlign: 'center',
                }}
            ></Footer> */}
      </div>
    </>
  );
}

export default HeaderLayout;
