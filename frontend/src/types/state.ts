import { ItemFilters, SingleItemGetOut } from './api';

export type ViewMode = 'grid' | 'list';

export interface AdsState {
  filters: ItemFilters;
  viewMode: ViewMode;
  currentAd: SingleItemGetOut | null;
}
