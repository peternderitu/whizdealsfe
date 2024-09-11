// This slice is for the purpose of recording user engagement with deals
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');
let doToken = Cookies.get('doToken');

export const dealActivitiesApi = createApi({
    reducerPath: 'dealActivitiesApi',
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    endpoints: (builder) => ({
        getDealActivity: builder.query({
            query: ()=> ({
                url: '/deal-activity',
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            }),
        }),

        storeDealActivity: builder.mutation({
            query: ({deal_id})=> ({
                url: '/deal-activity',
                method: 'POST',
                body: {deal_id},
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),

        getOneDealActivity: builder.query({
            query: ({id})=> ({
                url: `/do/deal-activity/${id}`,
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            }),
        })

    })
})

export const { useGetDealActivityQuery, useStoreDealActivityMutation, useGetOneDealActivityQuery } = dealActivitiesApi;