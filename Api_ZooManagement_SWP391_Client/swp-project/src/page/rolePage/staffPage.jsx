import React,{useState,useEffect} from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
const dataUser = JSON.parse(localStorage.getItem("dataUser"));
import SideMenu from './test'
import AppHeader from './headerTest'
import { Avatar, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function StaffPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('dataUser');
    navigate("/");
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: '',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
        </Sider>

        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between', // Để căn giữa và đặt Avatar ở bên phải
              alignItems: 'center', // Để căn giữa theo chiều dọc
            }}
          >

            <div className="demo-logo-vertical" />
            <div style={{ display: 'flex', alignItems: 'center' }} onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)}>
              <Avatar size="default" icon={<UserOutlined />} style={{ marginRight: '10px', color: 'black' }} />
              <span style={{ marginRight: '20px' }}>{dataUser && dataUser.data ? `${dataUser.data.first_name} ${dataUser.data.last_name}` : 'User Name'}</span>
              {showLogout && (
                <span style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={handleLogout}>
                  Đăng xuất
                </span>
              )}
            </div>

          </Header>
          {/* <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? 'more' : '...'}
                    <br />
                  </React.Fragment>
                ),
              )
            }
          </div>
        </Content> */}
          <Footer
            style={{
              textAlign: 'center',
            }}
          ></Footer>
        </Layout>
      </Layout>
    </>
  );
}
export default StaffPage;
