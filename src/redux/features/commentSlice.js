import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: ({ micro_blog_id }) => ({
        url: `/comments/${micro_blog_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Comments'],
    }),
    getOneComment: builder.query({
      query: ({ id }) => ({
        url: `/comments/get/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createComment: builder.mutation({
      query: ({ micro_blog_id, content }) => ({
        url: `/comments`,
        method: 'POST',
        body: { micro_blog_id, content },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    createReply: builder.mutation({
      query: ({ parent_comment_id, content }) => ({
        url: `/replies`,
        method: 'POST',
        body: { parent_comment_id, content },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: ({ id, micro_blog_id, content }) => ({
        url: `/comments/update/${id}`,
        method: 'POST',
        body: { micro_blog_id, content },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetOneCommentQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
