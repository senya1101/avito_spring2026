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

/** Упрощенная модель объявления для отображения в общем списке */
export interface ListItem {
  category: Category;
  title: string;
  price: number;
  needsRevision: boolean;
}

/** Структура ответа API со списком объявлений и счетчиком для пагинации */
export interface ItemsGetOut {
  items: ListItem[];
  total: number;
}

/** Расширенная модель объявления, возвращаемая при запросе по ID */
export interface SingleItemGetOut extends Item {
  needsRevision: boolean;
}

/** Тип данных для отправки изменений на сервер */
export type ItemUpdateIn = Omit<Item, 'id' | 'createdAt' | 'image'>;

/** Набор параметров для фильтрации, поиска и сортировки через API */
export interface ItemFilters {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: Category[];
  sortColumn?: 'title' | 'createdAt';
  sortDirection?: 'asc' | 'desc';
}

