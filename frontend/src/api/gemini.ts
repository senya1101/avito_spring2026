import { ItemUpdateIn } from '@types';
import { GoogleGenAI } from '@google/genai';

interface AiResponse<V> {
  value: V;
  display?: string;
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateDescription = async (
  adData: ItemUpdateIn,
): Promise<AiResponse<string>> => {
  const prompt = `
    Ты — эксперт по продажам на Авито. 
    На основе данных товара:
    Название: ${adData.title}
    Категория: ${adData.category}
    Параметры: ${JSON.stringify(adData.params)}
    
    Напиши продающее описание на русском языке. 
    Используй структуру:
    1. Краткое вступление.
    2. Список преимуществ/характеристик.
    3. Призыв к действию.
    
    ОГРАНИЧЕНИЯ:
    - Объем текста: от 600 до 1000 символов.
    - Пиши только текст описания, без лишних комментариев и заголовков типа "Описание товара".
  `;

  const result = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return {
    value: result.text || '',
  };
};

export const suggestPrice = async (
  adData: ItemUpdateIn,
): Promise<AiResponse<number>> => {
  const prompt = `
  Ты — ведущий аналитик цен на Авито. 
  Твоя задача: оценить товар "${adData.title}" в категории "${adData.category}".
  Характеристики: ${JSON.stringify(adData.params)}.

  Составь ответ по следующему шаблону:
  
  АНАЛИТИКА РЫНКА:
  - [Диапазон цен] для отличного состояния.
  - [Диапазон цен] для хорошего состояния.
  - [Диапазон цен] для срочной продажи или с дефектами.
  
  ИТОГОВОЕ ПРЕДЛОЖЕНИЕ:
  Краткое обоснование (1 предложение), почему выбрана именно такая цена.
  
  ЦЕНА: [число]
  
  Важно: в поле ЦЕНА напиши только одно число без пробелов и валюты.
`;

  const result = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  const text = result.text || '';
  const priceMatch = text.match(/ЦЕНА:\s*(\d+)/i);
  const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;

  return {
    value: price,
    display: text,
  };
};
