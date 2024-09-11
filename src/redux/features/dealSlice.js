import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('doToken');
let userToken = Cookies.get('token');
let adminToken = Cookies.get('adminToken');

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: () => ({
        url: '/deals',
      }),
      providesTags: ['Deals'],
    }),

    getDealsDO: builder.query({
      query: () => ({
        url: '/do/deals',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      providesTags: ['Deals'],
    }),

    getDealsAdmin: builder.query({
      query: () => ({
        url: '/admin/deals',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }),
      providesTags: ['Deals'],
    }),

    getAffiliates: builder.query({
      query: () => ({
        url: '/admin/affiliate-links',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }),
      providesTags: ['Deals'],
    }),

    getDealById: builder.query({
      query: ({ id }) => ({
        url: `/do/deals/${id}`,
      }),
    }),

    getDealByIdWithFavourite: builder.query({
      query: ({ id }) => ({
        url: `/user/deals/${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    }),

    createDeal: builder.mutation({
      query: (formDataWF) => ({
        url: '/do/deals',
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    createDealAdmin: builder.mutation({
      query: (formDataWF) => ({
        url: '/admin/deals',
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
      }),
      invalidatesTags: ['Deals']
    }),

    createAffiliate: builder.mutation({
      query: (formDataWF) => ({
        url: '/admin/affiliate-links',
        method: 'POST',
        body: formDataWF,
        headers: {
            Authorization: `Bearer ${adminToken}`
        }
      }),
      invalidatesTags: ['Deals']
    }),

    updateDeal: builder.mutation({
      query: ({formDataWF, id}) => ({
        url: `/do/deals/update/${id}`,
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    updateDealAdmin: builder.mutation({
      query: ({formDataWF, id}) => ({
        url: `/admin/deals/update/${id}`,
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    deleteDeal: builder.mutation({
      query: ({ id }) => ({
        url: `/do/deals/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    deleteDealAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/deals/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    approveDeal: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/deals/approve/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    rejectDeal: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/deals/reject/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    favouriteDeal: builder.mutation({
      query: ({ deal_id }) => ({
        url: '/favourites',
        method: 'POST',
        body: { deal_id },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),

    unFavouriteDeal: builder.mutation({
      query: ({ id }) => ({
        url: `/favourites/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      invalidatesTags: ['Deals'],
    }),
  }),
});

export const {
  useGetDealsQuery,
  useGetDealsDOQuery,
  useGetDealsAdminQuery,
  useGetAffiliatesQuery,
  useGetDealByIdQuery,
  useGetDealByIdWithFavouriteQuery,
  useCreateDealMutation,
  useCreateDealAdminMutation,
  useCreateAffiliateMutation,
  useUpdateDealMutation,
  useUpdateDealAdminMutation,
  useDeleteDealMutation,
  useDeleteDealAdminMutation,
  useApproveDealMutation,
  useRejectDealMutation,
  useFavouriteDealMutation,
  useUnFavouriteDealMutation,
} = dealsApi;
