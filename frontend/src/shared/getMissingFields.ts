import { ItemUpdateIn, Category } from '@types';
import { BASE_LABELS, PARAMS_LABELS, CATEGORY_FIELDS } from './constants';

const FIELD_LABELS: Record<string, string> = {
  ...BASE_LABELS,
  ...PARAMS_LABELS,
};

export const getMissingFields = (item: ItemUpdateIn | undefined): string[] => {
  if (!item) return [];

  const missing: string[] = [];

  const isValueEmpty = (value: unknown) => {
    return (
      value === undefined ||
      value === null ||
      value === '' ||
      (typeof value === 'number' && isNaN(value))
    );
  };

  ['title', 'price', 'description'].forEach((key) => {
    if (isValueEmpty(item[key as keyof ItemUpdateIn])) {
      missing.push(FIELD_LABELS[key] || key);
    }
  });

  const category = item.category as Category;
  const requiredParams = CATEGORY_FIELDS[category];

  if (requiredParams) {
    requiredParams.forEach((key) => {
      //Можно доработать тип Item с дженериком для params и тогда такого не будет
      const value = (item.params as Record<string, unknown>)[key];

      if (isValueEmpty(value)) {
        missing.push(PARAMS_LABELS[key as string] || (key as string));
      }
    });
  }

  return missing;
};
