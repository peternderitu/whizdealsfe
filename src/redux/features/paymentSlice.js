import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

const doToken = Cookies.get('doToken');

export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: axiosBaseQuery({ baseUrl:import.meta.env.VITE_BACKEND_URL }),
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: ({ amount }) => ({
                url: '/do/checkout',
                method: 'POST',
                body: { amount: amount * 100 },
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        initializePaymentIntent: builder.mutation({
            query: ({ amount }) => ({
                url: '/do/payment-intent',
                method: 'POST',
                body: { amount: amount * 100 },
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        // saveCardDetails: builder.mutation({
        //     query: ({ amount }) => ({
        //         url: '/do/save-card-details',
        //         method: 'POST',
        //         body: { amount: amount * 100 },
        //         headers: {
        //             Authorization: `Bearer ${doToken}`
        //         }
        //     })
        // }),
        createSetupIntent: builder.mutation({
            query: () => ({
                url: '/do/create-setup-intent',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        cardSaved: builder.mutation({
            query: ({payment_method}) => ({
                url: '/do/card-saved',
                method: 'POST',
                body: {payment_method},
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        chargeSavedCard: builder.mutation({
            query: () => ({
                url: '/do/charge-saved-card',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        retrieveSavedCards: builder.mutation({
            query: () => ({
                url: '/do/retrieve-saved-cards',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
        getAllPayments: builder.query({
            query: () => ({
                url: '/do/payments',
                headers: {
                    Authorization: `Bearer ${doToken}`
                }
            })
        }),
    })
})

export const { useMakePaymentMutation, useInitializePaymentIntentMutation, useCreateSetupIntentMutation, useCardSavedMutation, useChargeSavedCardMutation, useRetrieveSavedCardsMutation, useGetAllPaymentsQuery } = paymentsApi;