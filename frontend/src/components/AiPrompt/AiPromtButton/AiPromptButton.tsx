import { Button } from 'antd';
import { BulbOutlined, LoadingOutlined, RedoOutlined } from '@ant-design/icons';

interface AiPromptButtonProps {
  label: string;
  onClick: () => void;
  loading: boolean;
  error: boolean;
}

export const AiPromptButton = ({
  label,
  onClick,
  loading,
  error,
}: AiPromptButtonProps) => (
  <Button
    icon={
      error ? (
        <RedoOutlined />
      ) : loading ? (
        <LoadingOutlined />
      ) : (
        <BulbOutlined />
      )
    }
    loading={loading}
    onClick={onClick}
    style={{ color: '#fa8c16', fontSize: '12px', padding: '4px 8px' }}
  >
    {label}
  </Button>
);
