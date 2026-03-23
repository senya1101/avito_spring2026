import { Category, Item } from './ads';

/** Упрощенная модель объявления для отображения в общем списке */
export interface ListItem {
  id: number;
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
  sortColumn?: SortColumn;
  sortDirection?: SortDirection;
}

export type SortColumn = 'title' | 'createdAt';
export type SortDirection = 'asc' | 'desc';
export type SortValue = `${SortColumn}_${SortDirection}`;
