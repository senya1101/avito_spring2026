import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdsState, ItemFilters, SingleItemGetOut } from '@types';

const initialState: AdsState = {
  filters: {
    q: '',
    categories: [],
    needsRevision: false,
    limit: 10,
    skip: 0,
    sortColumn: 'createdAt',
    sortDirection: 'desc',
  },
  viewMode: 'grid',
  currentAd: null,
};

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ItemFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setCurrentAd: (state, action: PayloadAction<SingleItemGetOut | null>) => {
      state.currentAd = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setViewMode, setCurrentAd } =
  adsSlice.actions;
export default adsSlice.reducer;
