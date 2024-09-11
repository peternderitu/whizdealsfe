import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

export const favouritesApi = createApi({
    reducerPath: 'favouritesApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    endpoints: (builder)=> ({
        favouriteDeal: builder.mutation({
            query: ({deal_id})  => ({
                url: '/favourites',
                method: 'POST',
                body: {deal_id},
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Deals']
        }),
        unFavouriteDeal: builder.mutation({
            query: ({id})  => ({
                url: `/favourites/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Deals']
        }),
    })
})

export const { useFavouriteDealMutation, useUnFavouriteDealMutation } = favouritesApi;