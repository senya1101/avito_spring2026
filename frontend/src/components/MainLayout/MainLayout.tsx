import { Layout, Menu, ConfigProvider, theme, Switch } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { toggleTheme } from '@store/slices/themeSlice';
import { RootState, useDispatch, useSelector } from '@store/store';

const { Header, Content, Footer } = Layout;

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const mode = useSelector((state: RootState) => state.theme.mode);

  const menuItems = [
    { key: '/', label: 'Главная' },
    { key: '/ads', label: 'Объявления' },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            width: '100%',
          }}
        >
          <Menu
            mode="horizontal"
            theme={mode}
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ flex: 1, minWidth: 0, backgroundColor: 'transparent' }}
          />

          <Switch
            checked={mode === 'dark'}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            onClick={() => dispatch(toggleTheme())}
          />
        </Header>

        <Content>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>Avito Spring 2026</Footer>
      </Layout>
    </ConfigProvider>
  );
};
