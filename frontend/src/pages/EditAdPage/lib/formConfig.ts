export const FIELD_METADATA: Record<
  string,
  {
    label: string;
    type: 'string' | 'number' | 'select';
    options?: { label: string; value: string | number }[];
  }
> = {
  // Общие поля для Электроники и Авто
  brand: { label: 'Бренд', type: 'string' },
  model: { label: 'Модель', type: 'string' },

  // Автомобили
  yearOfManufacture: { label: 'Год выпуска', type: 'number' },
  transmission: {
    label: 'Коробка передач',
    type: 'select',
    options: [
      { label: 'Автомат', value: 'automatic' },
      { label: 'Механика', value: 'manual' },
    ],
  },
  mileage: { label: 'Пробег (км)', type: 'number' },
  enginePower: { label: 'Мощность двигателя (л.с.)', type: 'number' },

  // Недвижимость
  address: { label: 'Адрес', type: 'string' },
  area: { label: 'Площадь (м²)', type: 'number' },
  floor: { label: 'Этаж', type: 'number' },
  propertyType: {
    label: 'Тип недвижимости',
    type: 'select',
    options: [
      { label: 'Квартира', value: 'flat' },
      { label: 'Дом', value: 'house' },
      { label: 'Комната', value: 'room' },
    ],
  },

  // Электроника
  electronicsType: {
    label: 'Тип устройства',
    type: 'select',
    options: [
      { label: 'Телефон', value: 'phone' },
      { label: 'Ноутбук', value: 'laptop' },
      { label: 'Прочее', value: 'misc' },
    ],
  },
  condition: {
    label: 'Состояние',
    type: 'select',
    options: [
      { label: 'Новое', value: 'new' },
      { label: 'Б/У', value: 'used' },
    ],
  },
  color: { label: 'Цвет', type: 'string' },
};
