import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

export const repliesApi = createApi({
  reducerPath: 'repliesApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getReplies: builder.query({
      query: ({ parent_comment_id }) => ({
        url: `/replies/${parent_comment_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Replies'],
    }),
    getOneReply: builder.query({
      query: ({ id }) => ({
        url: `/replies/get/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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
      invalidatesTags: ['Replies'],
    }),
    updateReply: builder.mutation({
      query: ({ id, parent_comment_id, content }) => ({
        url: `/replies/update/${id}`,
        method: 'POST',
        body: { parent_comment_id, content },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Replies'],
    }),
    deleteReply: builder.mutation({
      query: ({ id }) => ({
        url: `/replies/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetRepliesQuery,
  useGetOneReplyQuery,
  
  useUpdateReplyMutation,
  useDeleteReplyMutation,
} = repliesApi;
