import {
  Layout,
  Typography,
  Input,
  Select,
  Card,
  Checkbox,
  Switch,
  Button,
  Space,
  Empty,
  List,
  Pagination,
} from 'antd';
import { useGetAdsQuery } from '@api/adsApi';
import {
  SearchOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Category, ListItem, SortValue } from '@types';
import { AdListItem } from '@components/ListItem';
import { useFilters } from '@hooks/useFilters';

const gridConfig = {
  gutter: 16,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5,
};
export const AdsPage = () => {
  const { Title, Text } = Typography;
  const {
    filters,
    viewMode,
    updateSearch,
    updateCategories,
    updateSort,
    toggleNeedsRevision,
    changePage,
    handleReset,
    handleChangeViewMode,
  } = useFilters();
  const { data, isFetching, isError, refetch } = useGetAdsQuery(filters);

  return (
    <Layout style={{ padding: '24px' }}>
      <Layout.Content
        style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            Мои объявления
          </Title>
          <Text type="secondary">{data?.total ?? 0} объявлений</Text>
        </div>

        <Card
          bodyStyle={{ padding: 16 }}
          style={{ marginBottom: 24, borderRadius: 12 }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Input
              placeholder="Найти объявление..."
              prefix={<SearchOutlined />}
              size="large"
              style={{ flex: 1, minWidth: 250 }}
              allowClear
              onChange={(e) => updateSearch(e.target.value)}
            />

            <Space size="middle">
              <Space.Compact>
                <Button
                  icon={<AppstoreOutlined />}
                  type={viewMode === 'grid' ? 'primary' : 'default'}
                  onClick={() => handleChangeViewMode('grid')}
                />
                <Button
                  icon={<BarsOutlined />}
                  type={viewMode === 'list' ? 'primary' : 'default'}
                  onClick={() => handleChangeViewMode('list')}
                />
              </Space.Compact>

              <Select
                defaultValue="createdAt_desc"
                style={{ width: 220 }}
                size="large"
                onChange={(val) => updateSort(val as SortValue)}
                options={[
                  { label: 'Сначала новые', value: 'createdAt_desc' },
                  { label: 'Сначала старые', value: 'createdAt_asc' },
                  { label: 'Название (А-Я)', value: 'title_asc' },
                  { label: 'Название (Я-А)', value: 'title_desc' },
                ]}
              />
            </Space>
          </div>
        </Card>

        <Layout style={{ background: 'transparent' }}>
          <Layout.Sider
            width={280}
            style={{
              borderRadius: 12,
              padding: 20,
              marginRight: 24,
              backgroundColor: 'transparent',
            }}
          >
            <Space
              orientation="vertical"
              size="large"
              style={{ width: '100%' }}
            >
              <div>
                <Title level={5}>Категории</Title>
                <Checkbox.Group
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                  options={[
                    { label: 'Авто', value: 'auto' },
                    { label: 'Электроника', value: 'electronics' },
                    { label: 'Недвижимость', value: 'real_estate' },
                  ]}
                  value={filters.categories}
                  onChange={(vals) => updateCategories(vals as Category[])}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text strong>Нужна доработка</Text>
                <Switch
                  checked={filters.needsRevision}
                  onChange={(checked) => toggleNeedsRevision(checked)}
                />
              </div>

              <Button block danger type="link" onClick={() => handleReset()}>
                Сбросить фильтры
              </Button>
            </Space>
          </Layout.Sider>

          <Layout.Content>
            {isError ? (
              <Empty description="Ошибка загрузки данных">
                <Button icon={<ReloadOutlined />} onClick={refetch}>
                  Повторить
                </Button>
              </Empty>
            ) : (
              <List
                grid={viewMode === 'grid' ? gridConfig : undefined}
                loading={isFetching}
                dataSource={data?.items}
                renderItem={(item: ListItem) => (
                  <AdListItem item={item} viewMode={viewMode} />
                )}
              />
            )}
            <Pagination
              style={{ marginTop: 40 }}
              current={filters.skip! / filters.limit! + 1}
              total={data?.total}
              pageSize={filters.limit}
              onChange={changePage}
              showSizeChanger={false}
            />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};
