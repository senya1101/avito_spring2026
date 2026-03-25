import { ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';

interface RevisionStateProps {
  missingFields: string[];
}

export const RevisionState = ({ missingFields }: RevisionStateProps) => {
  const isComplete = !missingFields.length;

  if (isComplete) return null;
  return (
    <Card
      bodyStyle={{ padding: '12px 16px 12px 50px' }}
      style={{
        borderRadius: 8,
      }}
    >
      <Flex gap={12}>
        <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 20 }} />

        <Typography.Title level={5} style={{ margin: 0 }}>
          Требуются доработки
        </Typography.Title>
      </Flex>

      <Typography.Text>У объявления не заполнены поля:</Typography.Text>
      <ul style={{ margin: 0 }}>
        {missingFields.map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
    </Card>
  );
};
