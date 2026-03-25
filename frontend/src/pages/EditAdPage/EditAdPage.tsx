import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Control, Controller, useForm } from 'react-hook-form';
import {
  Typography,
  Select,
  Divider,
  Input,
  Button,
  Flex,
  Layout,
  message,
  Skeleton,
  Space,
  InputNumber,
} from 'antd';

import { DynamicField } from '@components/DynamicField';
import { Category, ItemUpdateIn } from '@types';
import { FIELD_METADATA } from './lib/formConfig';
import { CATEGORY_FIELDS } from '@shared/constants';
import { useGetAdByIdQuery, useUpdateAdMutation } from '@api/adsApi';
import { AiPrompt } from '@components/AiPrompt';
import { useDispatch, useSelector } from '@store/store';
import {
  fetchAiDescription,
  fetchAiPrice,
  clearAiData,
} from '@store/slices/aiSlice';

export const EditAdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: ad, isFetching, isError } = useGetAdByIdQuery(id!);
  const [updateAd, { isLoading: isUpdating }] = useUpdateAdMutation();

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<ItemUpdateIn>({
      defaultValues: ad,
    });

  const { description, price } = useSelector((state) => state.ai);

  const selectedCategory = watch('category') as Category;

  useEffect(() => {
    if (ad) {
      reset(ad);
    }
  }, [ad, reset]);

  const onSubmit = async (formData: ItemUpdateIn) => {
    const msgKey = 'update_toast';
    try {
      message.loading({ content: 'Сохранение изменений...', key: msgKey });

      await updateAd({
        id: ad!.id.toString(),
        body: formData,
      }).unwrap();

      message.success({
        content: 'Объявление успешно обновлено!',
        key: msgKey,
        duration: 3,
      });

      navigate(`/ads/${ad!.id}`);
    } catch (error) {
      message.error({
        content: `Ошибка при сохранении: ${(error as { data: { message: string } })?.data?.message || 'Попробуйте позже'}`,
        key: msgKey,
        duration: 4,
      });
    }
  };

  if (isFetching)
    return (
      <Layout style={{ padding: 24 }}>
        <Skeleton active />
      </Layout>
    );
  if (isError || !ad)
    return <Layout style={{ padding: 24 }}>Ошибка загрузки данных</Layout>;

  return (
    <Layout style={{ background: '#fff', padding: '24px', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 800 }}>
        <Typography.Title level={3}>Редактирование объявления</Typography.Title>

        <Flex vertical gap={4}>
          <Typography.Text strong>Категория</Typography.Text>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: '100%' }}
                options={[
                  { label: 'Авто', value: 'auto' },
                  { label: 'Электроника', value: 'electronics' },
                  { label: 'Недвижимость', value: 'real_estate' },
                ]}
              />
            )}
          />
        </Flex>

        <Divider />

        <Flex vertical gap={16}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            <Typography.Text strong>Название</Typography.Text>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </Space>

          <Space orientation="vertical" style={{ width: '100%' }}>
            <Typography.Text strong>Цена (₽)</Typography.Text>
            <Flex align="center" gap={8}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputNumber {...field} style={{ width: '100%' }} />
                )}
              />
              <AiPrompt<number>
                label="Узнать рыночную цену"
                fieldName="price"
                aiValue={price.value}
                aiDisplayValue={price.display}
                isLoading={price.isLoading}
                isError={price.isError}
                onFetch={() => dispatch(fetchAiPrice(watch()))}
                onApply={(val) => {
                  setValue('price', val);
                  dispatch(clearAiData());
                }}
                onCancel={() => dispatch(clearAiData())}
              />
            </Flex>
          </Space>
        </Flex>

        <Divider />

        <Typography.Title level={5} style={{ marginTop: 24 }}>
          Характеристики
        </Typography.Title>

        <Flex gap={12} vertical>
          {CATEGORY_FIELDS[selectedCategory || ad.category]?.map(
            (fieldName) => {
              const meta = FIELD_METADATA[fieldName];
              if (!meta) return null;

              return (
                <DynamicField
                  key={fieldName}
                  name={fieldName}
                  label={meta.label}
                  type={meta.type}
                  options={meta.options}
                  control={control as unknown as Control}
                />
              );
            },
          )}
        </Flex>

        <Divider />

        <Space orientation="vertical" style={{ width: '100%' }}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input.TextArea {...field} rows={6} />}
            />
            <AiPrompt<string>
              label="Улучшить описание"
              fieldName="description"
              aiValue={description.value}
              aiDisplayValue={description.value}
              isLoading={description.isLoading}
              isError={description.isError}
              onFetch={() => dispatch(fetchAiDescription(watch()))}
              onApply={(val) => {
                setValue('description', val);
                dispatch(clearAiData());
              }}
              onCancel={() => dispatch(clearAiData())}
            />
          </Space>
        </Space>

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isUpdating}
          >
            Сохранить
          </Button>
          <Button size="large" onClick={() => navigate(-1)}>
            Отменить
          </Button>
        </div>
      </form>
    </Layout>
  );
};
