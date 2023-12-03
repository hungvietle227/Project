import React, { useState } from "react";
import AppHeader from "./page/rolePage/headerTest";
import SideMenuTest from "./page/rolePage/SideMenuTest";
import { Outlet } from "react-router-dom";
import "../src/assets/css/dashboard.css";
import AddFood from "./page/Food/AddFood";
import SliderHero from "./page/sliderHero";
import SideMenu from "./page/rolePage/test";
import SideMenuStaff from "./page/rolePage/SideMenuStaff";
import SideMenuZooTrainer from "./page/rolePage/SideMenuZooTrainer";
import { Sticky } from "react-sticky";
function HeaderLayOutTrainer() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    return (
        <>
            <div className="App">
                    <AppHeader  style={{position: "sticky", top: 0}}  OpenSidebar={OpenSidebar} />
                <div
                    className="SideMenuAndPageContent"
                    style={{ "background-color": 'ghostwhite'}}
                >
                    <SideMenuZooTrainer
                        openSidebarToggle={openSidebarToggle}
                        OpenSidebar={OpenSidebar} />
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

export default HeaderLayOutTrainer;
