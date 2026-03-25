import { describe, it, expect } from 'vitest';
import { ItemUpdateIn } from '@types';
import { getMissingFields } from '@shared/getMissingFields';

describe('getMissingFields', () => {
  it('должна возвращать пустой массив, если item не передан', () => {
    expect(getMissingFields(undefined)).toEqual([]);
  });

  it('должна находить пропущенные базовые поля (title, price, description)', () => {
    const item = {
      title: '',
      price: NaN,
      description: undefined,
      category: 'auto',
      params: {},
    };

    const result = getMissingFields(item as ItemUpdateIn);

    expect(result).toContain('Название');
    expect(result).toContain('Цена');
    expect(result).toContain('Описание');
  });

  it('должна находить пропущенные специфичные поля для категории', () => {
    const item = {
      title: 'Tesla',
      price: 100,
      description: 'Cool car',
      category: 'auto',
      params: {
        model: '',
        year: 2024,
      },
    };

    const result = getMissingFields(item as unknown as ItemUpdateIn);
    expect(result).toEqual([
      'Бренд',
      'Модель',
      'Год выпуска',
      'Коробка передач',
      'Пробег',
      'Мощность двигателя',
    ]);
  });

  it('должна возвращать пустой массив, если все поля и параметры заполнены', () => {
    const item = {
      title: 'House',
      price: 2000,
      description: 'description',
      category: 'real_estate',
      params: {
        type: 'flat',
        address: 'string',
        area: 0,
        floor: 0,
      },
    };

    const result = getMissingFields(item as unknown as ItemUpdateIn);
    expect(result).toHaveLength(0);
  });
});
