import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const adminAuthApi = createApi({
    reducerPath: 'adminAuthApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL}),
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: ({ first_name, last_name, email, password}) => ({
                url: '/admin/register',
                method: 'POST',
                body: { first_name, last_name, email, password }
            })
        }),
        loginAdmin: builder.mutation({
            query: ({ email, password }) => ({
                url: '/admin/login',
                method: 'POST',
                body: { email, password }
            }),
        })
    })
})

export const { useRegisterAdminMutation, useLoginAdminMutation } = adminAuthApi;