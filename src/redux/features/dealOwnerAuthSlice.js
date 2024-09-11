import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let doToken = Cookies.get('doToken');

export const dealOwnerAuthApi = createApi({
  reducerPath: 'dealOwnerAuthApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({

    registerDealOwner: builder.mutation({
      query: ({ email, password, first_name, last_name, password_confirmation }) => ({
        url: '/do/register',
        method: 'POST',
        body: { email, password, first_name, last_name, password_confirmation },
      }),
    }),

    loginDealOwner: builder.mutation({
      query: ({ email, password }) => ({
        url: '/do/login',
        method: 'POST',
        body: { email, password },
      }),
    }),

    getAuthenticatedDealOwner: builder.query({
      query: () => ({
        url: '/do',
        headers: {
          Authorization: `Bearer ${doToken}`
        }
      })
    })
  }),
});

export const { useRegisterDealOwnerMutation, useLoginDealOwnerMutation, useGetAuthenticatedDealOwnerQuery } =
  dealOwnerAuthApi;
