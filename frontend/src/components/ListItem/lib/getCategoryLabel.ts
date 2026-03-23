import { Category } from '@types';

// Словарь переводов
const categoryTranslations: Record<Category, string> = {
  auto: 'Авто',
  electronics: 'Электроника',
  real_estate: 'Недвижимость',
};

export const getCategoryLabel = (category: Category | string): string => {
  return (
    categoryTranslations[category as Category] || category || 'Без категории'
  );
};
