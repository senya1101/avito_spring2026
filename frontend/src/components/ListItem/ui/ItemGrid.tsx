import { Card, Space, Typography, Badge, Image, Tag } from 'antd';
import { ItemProps } from '../lib/types';
import placeholder from '@assets/placeholder.png';
import { getCategoryLabel } from '../lib/getCategoryLabel';

export const ItemGrid = ({ item, handleClick }: ItemProps) => {
  return (
    <Card
      hoverable
      onClick={() => handleClick(item.id)}
      bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column' }}
      cover={
        <div
          style={{
            height: 180,
            borderRadius: '8px 8px 0 0',
            overflow: 'hidden',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt={item.title}
            fallback={placeholder}
          />
        </div>
      }
    >
      <Space
        direction="vertical"
        size={2}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Tag
          style={{
            borderRadius: 8,
            border: '1px solid #D9D9D9',
            padding: '2px 8px',
            marginBottom: 6,
          }}
        >
          {getCategoryLabel(item.category)}
        </Tag>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
            overflow: 'hidden',
            fontSize: 16,
          }}
        >
          {item.title}
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0, fontSize: 16 }}>
          {item.price.toLocaleString()} ₽
        </Typography.Title>
        {item.needsRevision && (
          <Badge
            status="warning"
            style={{
              background: '#F9F1E6',
              borderRadius: 8,
              padding: '2px 8px',
            }}
            text={
              <Typography.Text type="warning" strong style={{ fontSize: 12 }}>
                Требует доработки
              </Typography.Text>
            }
          />
        )}
      </Space>
    </Card>
  );
};
