import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters, setViewMode } from '@store/slices/adsSlice';
import {
  Category,
  SortColumn,
  SortDirection,
  SortValue,
  ViewMode,
} from '@types';
import { RootState } from '@store/store';

export const useFilters = () => {
  const dispatch = useDispatch();

  const { filters, viewMode } = useSelector((state: RootState) => state.ads);

  const updateSearch = (q: string) => {
    dispatch(setFilters({ q, skip: 0 }));
  };

  const updateCategories = (categories: Category[]) => {
    dispatch(setFilters({ categories, skip: 0 }));
  };

  const updateSort = (sortOption: SortValue) => {
    const [col, dir] = sortOption.split('_');
    dispatch(
      setFilters({
        sortColumn: col as SortColumn,
        sortDirection: dir as SortDirection,
      }),
    );
  };

  const toggleNeedsRevision = (needsRevision: boolean) => {
    dispatch(setFilters({ needsRevision, skip: 0 }));
  };

  const changePage = (page: number, pageSize: number) => {
    dispatch(
      setFilters({
        limit: pageSize,
        skip: (page - 1) * pageSize,
      }),
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleChangeViewMode = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  return {
    filters,
    viewMode,
    updateSearch,
    updateCategories,
    updateSort,
    toggleNeedsRevision,
    changePage,
    handleReset,
    handleChangeViewMode,
  };
};
