import { Card, Typography, Image, Badge } from 'antd';
import { ItemProps } from '../lib/types';
import placeholder from '@assets/placeholder.png';
import { getCategoryLabel } from '../lib/getCategoryLabel';

export const ItemRow = ({ item, handleClick }: ItemProps) => {
  return (
    <Card
      hoverable
      onClick={() => handleClick(item.id)}
      bodyStyle={{ padding: '0px' }}
      style={{
        width: '100%',
        border: 'none',
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          style={{
            width: 179,
            minHeight: 120,
            display: 'flex',
            borderRadius: '8px 0 0 8px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
            }}
            alt={item.title}
            fallback={placeholder}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            padding: '16px 24px',
            flex: 1,
          }}
        >
          <Typography.Text type="secondary" style={{ margin: 0, fontSize: 14 }}>
            {getCategoryLabel(item.category)}
          </Typography.Text>
          <Typography.Title level={5} style={{ margin: 0, fontSize: 16 }}>
            {item.title}
          </Typography.Title>
          <Typography.Title level={4} style={{ margin: 0, fontSize: 16 }}>
            {item.price.toLocaleString()} ₽
          </Typography.Title>

          {item.needsRevision && (
            <Badge
              status="warning"
              style={{
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
        </div>
      </div>
    </Card>
  );
};
