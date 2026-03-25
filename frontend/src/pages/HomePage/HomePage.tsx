import {
  Typography,
  Button,
  Row,
  Col,
  Card,
  Space,
  Tag,
  theme,
  Divider,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  RocketOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const HomePage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Title level={1}>Личный кабинет продавца</Title>
        <Paragraph style={{ fontSize: 18, color: token.colorTextDescription }}>
          Интерфейс для управления объявлениями с интегрированным AI-ассистентом
          на базе Gemini.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          onClick={() => navigate('/ads')}
          style={{ height: 48, padding: '0 32px', borderRadius: 8 }}
        >
          Начать работу
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <ThunderboltOutlined
              style={{ fontSize: 24, color: '#1677ff', marginBottom: 16 }}
            />
            <Title level={4}>Управление</Title>
            <Text type="secondary">
              Список всех объявлений с фильтрацией, поиском и динамическими
              формами редактирования под категории.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <RobotOutlined
              style={{ fontSize: 24, color: '#52c41a', marginBottom: 16 }}
            />
            <Title level={4}>AI-ассистент</Title>
            <Text type="secondary">
              Автоматическая генерация продающих описаний и оценка рыночной
              стоимости товаров в реальном времени.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <SettingOutlined
              style={{ fontSize: 24, color: '#13c2c2', marginBottom: 16 }}
            />
            <Title level={4}>Валидация</Title>
            <Text type="secondary">
              Умный виджет контроля заполнения полей и автоматический расчет
              статуса "Нужна доработка".
            </Text>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 64, textAlign: 'center' }}>
        <Divider>Стек технологий</Divider>
        <Space size={[0, 8]} wrap style={{ justifyContent: 'center' }}>
          <Tag color="blue">React 19</Tag>
          <Tag color="blue">TypeScript</Tag>
          <Tag color="volcano">Redux Toolkit</Tag>
          <Tag color="cyan">Ant Design</Tag>
          <Tag color="geekblue">Vite</Tag>
          <Tag color="purple">Fastify</Tag>
        </Space>
      </div>
    </div>
  );
};
