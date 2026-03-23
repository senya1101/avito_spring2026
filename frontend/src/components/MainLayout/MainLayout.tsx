import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/', label: 'Главная' },
    { key: '/ads', label: 'Обьявления' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'fff' }}>
        <Menu
          theme={'dark'}
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>Avito Spring 2026</Footer>
    </Layout>
  );
};
