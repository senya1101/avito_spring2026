import { Popconfirm, Typography } from 'antd';
import { AiPromptButton } from './AiPromtButton/AiPromptButton';
import Markdown from 'react-markdown';

interface AiPromptProps<T> {
  label: string;
  fieldName: string;
  aiValue: T | null;
  aiDisplayValue?: string;
  isLoading: boolean;
  isError: boolean;
  onFetch: () => void;
  onApply: (val: T) => void;
  onCancel?: () => void;
}

export const AiPrompt = <T extends string | number>({
  label,
  aiValue,
  aiDisplayValue,
  isLoading,
  isError,
  onFetch,
  onApply,
  onCancel,
}: AiPromptProps<T>) => {
  const hasResult = !!aiValue && !isLoading;

  return (
    <Popconfirm
      icon={null}
      title={<Typography.Text strong>Аналитика и ответ AI</Typography.Text>}
      open={hasResult}
      onConfirm={() => aiValue && onApply(aiValue)}
      onCancel={onCancel}
      okText="Применить"
      cancelText="Закрыть"
      overlayStyle={{ maxWidth: '400px' }}
      description={
        <div style={{ marginTop: '10px' }}>
          <div
            style={{
              maxHeight: '250px',
              overflowY: 'auto',
              paddingRight: '8px',
              fontSize: '13px',
              lineHeight: '1.6',
            }}
          >
            <Markdown>{aiDisplayValue || aiValue?.toString() || ''}</Markdown>
          </div>
        </div>
      }
    >
      {/* Обертка в span предотвращает конфликты событий AntD */}
      <span onClick={(e) => e.stopPropagation()}>
        <AiPromptButton
          label={aiValue ? `Обновить запрос` : label}
          onClick={onFetch}
          loading={isLoading}
          error={isError}
        />
      </span>
    </Popconfirm>
  );
};
