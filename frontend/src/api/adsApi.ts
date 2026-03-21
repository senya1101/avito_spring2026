import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ItemsGetOut,
  SingleItemGetOut,
  ItemUpdateIn,
  ItemFilters,
} from '@types';

export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  tagTypes: ['Ads'],
  endpoints: (builder) => ({
    getAds: builder.query<ItemsGetOut, ItemFilters>({
      query: (filters) => ({
        url: '/items',
        params: {
          ...filters,
          categories: filters.categories?.join(','),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ title }) => ({
                type: 'Ads' as const,
                id: title,
              })),
              { type: 'Ads', id: 'LIST' },
            ]
          : [{ type: 'Ads', id: 'LIST' }],
    }),

    getAdById: builder.query<SingleItemGetOut, string>({
      query: (id) => `/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Ads', id }],
    }),

    updateAd: builder.mutation<
      SingleItemGetOut,
      { id: string; body: ItemUpdateIn }
    >({
      query: ({ id, body }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ads', id },
        { type: 'Ads', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetAdsQuery, useGetAdByIdQuery, useUpdateAdMutation } =
  adsApi;
