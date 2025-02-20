import React from "react";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";
import FontConverter from "./components/FontConverter/FontConverter";
import AIFontConverter from "./components/AIFontConverter/AIFontConverter";
import "./App.less";
import { Layout, Menu } from "antd";
import { SignatureOutlined, RobotOutlined, SunOutlined } from "@ant-design/icons";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AppContent: React.FC = () => {
  const { user } = useUser();
  const { Header, Footer, Sider, Content } = Layout;
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/converter",
      icon: <SignatureOutlined className="menu-icon" />,
      label: "花体转换",
    },
    {
      key: "/aiconverter",
      icon: <RobotOutlined className="menu-icon" />,
      label: "AI创意花体",
    },
  ];

  console.log("user", user);

  return (
    <Layout className="app-container">
      <Header className="header-container">
        <SunOutlined className="sun-icon" />
        <h1 className="header-title">
          Font Converter
        </h1>
      </Header>
      <Layout>
        <Sider className="sider-container">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onSelect={({ key }) => navigate(key)}
            className="menu-container"
          />
        </Sider>
        <Content className="content-container">
          <Routes>
            <Route path="/converter" element={<FontConverter />} />
            <Route path="/aiconverter" element={<AIFontConverter />} />
            <Route path="/" element={<Navigate to="/converter" />} />
          </Routes>
        </Content>
      </Layout>
      <Footer className="footer-container">
        <div>
          <span>反馈邮箱：zhangxi7918@163.com</span>
          <span style={{ margin: '0 16px' }}>|</span>
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span style={{ margin: '0 16px' }}>|</span>
          <span>© 2024 Font Converter. All rights reserved.</span>
        </div>
      </Footer>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
