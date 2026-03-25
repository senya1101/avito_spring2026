import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import placeholder from '@assets/placeholder.png';

import {
  Layout,
  Typography,
  Button,
  Space,
  Skeleton,
  Empty,
  Image,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useGetAdByIdQuery } from '@api/adsApi';
import { useDispatch } from '@store/store';
import { setCurrentAd } from '@store/slices/adsSlice';
import { DisplayParam, formatItemParams } from './lib/formatItemParams';
import { getMissingFields } from '@shared/getMissingFields';
import { RevisionState } from '@components/RevisionsState';
import { formatDate } from '@shared/formatDate';

const { Title, Text, Paragraph } = Typography;

export const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: ad, isFetching, isError } = useGetAdByIdQuery(id!);
  const specs = useMemo(() => (ad ? formatItemParams(ad) : []), [ad]);

  useEffect(() => {
    if (ad) {
      dispatch(setCurrentAd(ad));
    }
    return () => {
      dispatch(setCurrentAd(null));
    };
  }, [ad, dispatch]);

  if (isFetching)
    return (
      <div style={{ padding: 40 }}>
        <Skeleton active />
      </div>
    );

  if (isError || !ad)
    return (
      <Empty description="Объявление не найдено">
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </Empty>
    );

  return (
    <Layout style={{ background: '#fff', padding: '24px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {ad.title}
            </Title>
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ marginTop: 12, borderRadius: 6 }}
              onClick={() => navigate('edit')}
            >
              Редактировать
            </Button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Title level={2} style={{ margin: 0 }}>
              {ad.price?.toLocaleString()} ₽
            </Title>
            <Space direction="vertical" size={0} style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Опубликовано: {formatDate(ad.createdAt)}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Отредактировано: {formatDate(ad.createdAt)}
              </Text>
            </Space>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32, marginTop: 32 }}>
          <div style={{ flex: '0 0 450px' }}>
            <div
              style={{
                height: 360,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <Image
                wrapperStyle={{ width: '100%', height: '100%' }}
                fallback={placeholder}
                src={ad.image}
                alt={ad.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ marginTop: 32 }}>
              <Title level={4}>Описание</Title>
              <Paragraph
                style={{ fontSize: 15, color: '#444', lineHeight: '1.6' }}
              >
                {ad.description || 'Нет описания'}
              </Paragraph>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: 36,
              flexDirection: 'column',
            }}
          >
            {ad.needsRevision && (
              <RevisionState missingFields={getMissingFields(ad)} />
            )}

            <Title level={4}>Характеристики</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {specs.map((p: DisplayParam, index: number) => (
                <div key={index} style={{ display: 'flex', maxWidth: 400 }}>
                  <Typography.Text type="secondary" style={{ flex: 1 }}>
                    {p.label}
                  </Typography.Text>
                  <Typography.Text style={{ flex: 1 }}>
                    {p.value}
                  </Typography.Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
