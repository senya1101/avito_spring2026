import { Control, Controller } from 'react-hook-form';
import { Input, InputNumber, Select, Typography } from 'antd';

interface DynamicFieldProps {
  name: string;
  label: string;
  control: Control;
  type: 'string' | 'number' | 'select';
  options?: { label: string; value: string | number }[];
  onBlur: () => void;
}

export const DynamicField = ({
  name,
  label,
  control,
  type,
  options,
  onBlur,
}: DynamicFieldProps) => (
  <div style={{ marginBottom: 16 }}>
    <Typography.Text style={{ marginBottom: 8 }}>{label}</Typography.Text>
    <Controller
      name={`params.${name}`}
      control={control}
      render={({ field }) => {
        if (type === 'select') {
          return (
            <Select
              {...field}
              options={options}
              style={{ width: '100%' }}
              placeholder={label}
              onBlur={() => {
                field.onBlur();
                onBlur();
              }}
            />
          );
        }
        if (type === 'number') {
          return (
            <InputNumber
              {...field}
              style={{ width: '100%' }}
              placeholder={label}
              onBlur={() => {
                field.onBlur();
                onBlur();
              }}
            />
          );
        }
        return (
          <Input
            {...field}
            placeholder={label}
            allowClear
            onBlur={() => {
              field.onBlur();
              onBlur();
            }}
          />
        );
      }}
    />
  </div>
);
