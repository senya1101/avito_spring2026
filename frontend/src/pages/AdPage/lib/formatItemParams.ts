import { CATEGORY_FIELDS, labels, translations } from '@shared/constants';
import { Item } from '@types';

export interface DisplayParam {
  label: string;
  value: string;
}

export const formatItemParams = (item: Item): DisplayParam[] => {
  const { category, params } = item;

  const fieldsToShow = CATEGORY_FIELDS[category];

  return fieldsToShow.map((key) => {
    const label = labels[key];

    const value = (params as Record<string, unknown>)[key];

    if (value === undefined || value === null || value === '') {
      return { label, value: 'Не указано' };
    }

    let displayValue: string = translations[String(value)] || String(value);

    if (key === 'mileage')
      displayValue = `${Number(value).toLocaleString()} км`;
    if (key === 'area') displayValue = `${value} м²`;
    if (key === 'enginePower') displayValue = `${value} л.с.`;

    return { label, value: displayValue };
  });
};
