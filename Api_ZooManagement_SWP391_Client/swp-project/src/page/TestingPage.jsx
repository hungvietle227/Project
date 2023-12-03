import React from 'react'
import AppHeader from './rolePage/headerTest'
import SideMenu from './rolePage/test'
import { Avatar, Layout, Menu, theme } from 'antd';
import SideMenuTest from './rolePage/SideMenuTest';
import PageContent from './PageContent';

const { Header, Content, Footer, Sider } = Layout;
const TestingPage = () => {
    return (
        <div className="App">
            <AppHeader />
            
            <div className="SideMenuAndPageContent">
                {/* <SideMenu></SideMenu> */}
                <SideMenuTest></SideMenuTest>
                <PageContent></PageContent>
            </div>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            ></Footer>
        </div>
    )
}

export default TestingPage