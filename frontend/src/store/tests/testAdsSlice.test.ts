import { describe, it, expect } from 'vitest';
import adsReducer, {
  setFilters,
  resetFilters,
  setViewMode,
  setCurrentAd,
  initialState,
} from '../slices/adsSlice';
import { ItemFilters, SingleItemGetOut } from '@types';

describe('adsSlice reducer', () => {
  describe('setFilters', () => {
    it('должен частично обновлять фильтры', () => {
      const partialFilter: Partial<ItemFilters> = { q: 'iphone', limit: 20 };
      const state = adsReducer(initialState, setFilters(partialFilter));

      expect(state.filters.q).toBe('iphone');
      expect(state.filters.limit).toBe(20);
      expect(state.filters.sortColumn).toBe('createdAt');
    });
  });

  describe('resetFilters', () => {
    it('должен сбрасывать фильтры к начальным значениям', () => {
      const dirtyState = {
        ...initialState,
        filters: { ...initialState.filters, q: 'test', limit: 50 },
      };

      const state = adsReducer(dirtyState, resetFilters());
      expect(state.filters).toEqual(initialState.filters);
    });
  });

  describe('setViewMode', () => {
    it('должен изменять режим отображения', () => {
      const state = adsReducer(initialState, setViewMode('list'));
      expect(state.viewMode).toBe('list');

      const backToGrid = adsReducer(state, setViewMode('grid'));
      expect(backToGrid.viewMode).toBe('grid');
    });
  });

  describe('setCurrentAd', () => {
    it('должен устанавливать текущее объявление', () => {
      const mockAd = {
        id: '1',
        title: 'Test Ad',
        needsRevision: false,
        category: 'auto',
        price: 5,
        createdAt: '',
        params: {},
      } as unknown as SingleItemGetOut;
      const state = adsReducer(initialState, setCurrentAd(mockAd));

      expect(state.currentAd).toEqual(mockAd);
    });

    it('должен очищать текущее объявление при передаче null', () => {
      const stateWithAd = {
        ...initialState,
        currentAd: { id: '1' } as unknown as SingleItemGetOut,
      };
      const state = adsReducer(stateWithAd, setCurrentAd(null));

      expect(state.currentAd).toBeNull();
    });
  });
});
