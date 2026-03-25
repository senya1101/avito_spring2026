import {
  AutoItemParams,
  ElectronicsItemParams,
  RealEstateItemParams,
} from '@types';

export const PARAMS_LABELS: Record<string, string> = {
  brand: 'Бренд',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
  condition: 'Состояние',
  color: 'Цвет',
};

export const BASE_LABELS: Record<string, string> = {
  title: 'Название',
  price: 'Цена',
  description: 'Описание',
};

export const TRANSLATION: Record<string, string> = {
  automatic: 'Автомат',
  manual: 'Механика',
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',
  phone: 'Телефон',
  laptop: 'Ноутбук',
  new: 'Новое',
  used: 'Б/У',
};

export const CATEGORY_FIELDS: {
  auto: (keyof AutoItemParams)[];
  real_estate: (keyof RealEstateItemParams)[];
  electronics: (keyof ElectronicsItemParams)[];
} = {
  auto: [
    'brand',
    'model',
    'yearOfManufacture',
    'transmission',
    'mileage',
    'enginePower',
  ],
  real_estate: ['type', 'address', 'area', 'floor'],
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
};
