import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

export const microBlogReportsApi = createApi({
  reducerPath: 'microBlogReportsApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    
    getReportingReasons: builder.query({
      query: () => ({
        url: '/reporting-reason'
      })
    }),    
    createMicroBlogReport: builder.mutation({
      query: (body) => ({
        url: '/report-community-deal',
        method: 'POST',
        body: body,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      // invalidatesTags: ['Categories'],
    })
  }),
});

export const {
  useGetReportingReasonsQuery,
  useCreateMicroBlogReportMutation
} = microBlogReportsApi;
