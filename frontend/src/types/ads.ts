/** Категории объявлений: транспорт, недвижимость, электроника */
export type Category = 'auto' | 'real_estate' | 'electronics';

/** Специфические параметры для автомобилей */
export interface AutoItemParams {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
}

/** Параметры объектов жилой недвижимости */
export interface RealEstateItemParams {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
}

/** Параметры потребительской электроники и гаджетов */
export interface ElectronicsItemParams {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
}

/** Обобщенный тип дополнительных характеристик товара */
export type ItemParams =
  | AutoItemParams
  | RealEstateItemParams
  | ElectronicsItemParams;

/** Базовая модель объявления со всеми данными */
export interface Item {
  id: string;
  category: Category;
  title: string;
  description?: string;
  price: number;
  createdAt: string;
  params: ItemParams;
  image?: string;
}