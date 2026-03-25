import { Button, Empty, Typography, Space, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ background: '#fff', padding: '24px', minHeight: '100vh' }}>
      <Empty
        image={<ShoppingOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
        description={
          <Space direction="vertical">
            <Typography.Title level={2}>Ой! Ничего не нашлось</Typography.Title>
            <Typography.Text type="secondary">
              Возможно, вы ввели неверный адрес или ссылка устарела.
            </Typography.Text>
          </Space>
        }
      >
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/')}
          style={{ borderRadius: '8px' }}
        >
          На главную
        </Button>
      </Empty>
    </Layout>
  );
};
