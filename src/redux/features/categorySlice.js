import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';


let adminToken = Cookies.get('adminToken');

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/admin/categories',
      }),
      providesTags: ['Categories'],
    }),
    getOneCategory: builder.query({
      query: ({ id }) => ({
        url: `/admin/categories/${id}`,
      }),
      // providesTags: ['Categories']
    }),
    createCategory: builder.mutation({
      query: (formDataWF) => ({
        url: '/admin/categories',
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, formDataWF }) => ({
        url: `/admin/categories/update/${id}`,
        method: 'POST',
        body: formDataWF,
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
