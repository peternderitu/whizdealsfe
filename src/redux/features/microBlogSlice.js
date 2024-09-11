import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');
let adminToken = Cookies.get('adminToken');

export const microBlogsApi = createApi({
  reducerPath: 'microBlogsApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getAllMicroBlogs: builder.query({
      query: () => ({
        url: '/micro-blog',
      }),
      providesTags: ['MicroBlogs'],
    }),

    getMyMicroBlogs: builder.query({
      query: () => ({
        url: '/my-micro-blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['MicroBlogs'],
    }),

    getMicroBlogById: builder.query({
      query: ({ id }) => ({
        url: `/micro-blog/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createMicroBlog: builder.mutation({
      query: (formDataWF) => ({
        url: '/micro-blog',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataWF,
      }),
      invalidatesTags: ['MicroBlogs'],
    }),

    updateMicroBlog: builder.mutation({
      query: ({ formDataWF, id }) => ({
        url: `/micro-blog/update/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataWF,
      }),
      invalidatesTags: ['MicroBlogs'],
    }),

    deleteMicroBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/micro-blog/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['MicroBlogs'],
    }),

    deleteMicroBlogAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/micro-blog/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }),
      invalidatesTags: ['MicroBlogs'],
    }),

    favouriteMicroBlog: builder.mutation({
      query: ({ micro_blog_id }) => ({
        url: '/micro-blog/favourites',
        method: 'POST',
        body: { micro_blog_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['MicroBlogs'],
    }),

    unFavouriteMicroBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/micro-blog/favourites/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['MicroBlogs'],
    }),
  }),
});

export const {
  useGetAllMicroBlogsQuery,
  useGetMyMicroBlogsQuery,
  useGetMicroBlogByIdQuery,
  useCreateMicroBlogMutation,
  useUpdateMicroBlogMutation,
  useDeleteMicroBlogMutation,
  useDeleteMicroBlogAdminMutation,
  useFavouriteMicroBlogMutation,
  useUnFavouriteMicroBlogMutation,
} = microBlogsApi;
