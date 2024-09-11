import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password, first_name, last_name, password_confirmation }) => ({
        url: '/user/register',
        method: 'POST',
        body: { email, password, first_name, last_name, password_confirmation },
      }),
    }),

    storeStudentEmail: builder.mutation({
      query: ({ id, studentEmail }) => ({
        url: `/user/store/student-email/${id}`,
        method: 'POST',
        body: { studentEmail },
      }),
    }),

    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: { email, password },
      }),
    }),

    verifyStudentEmail: builder.mutation({
      query: ({ id, otpCode }) => ({
        url: '/user/verify-student-email',
        method: 'POST',
        body: { id, otpCode },
      }),
    }),

    resendOTPCode: builder.mutation({
      query: ({ id }) => ({
        url: '/user/resend-otp-code',
        method: 'POST',
        body: { id },
      }),
    }),

    getAuthenticatedUser: builder.query({
      query: () => ({
        url: '/user',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),

    sendPasswordResetLinkEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: { email }
      })
    }),

    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: '/user/password-reset',
        method: 'POST',
        body: { password, token }
      })
    }),

    updateUser: builder.mutation({
      query: ({first_name, last_name, email, id}) => ({
        url: `/user/update/${id}`,
        method: 'POST',
        body: {first_name, last_name, email},
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),

    verifyInboundEmail: builder.mutation({
      query: ({id}) => ({
        url: `/user/verify/inbound/email/${id}`,
        method: 'POST'
      })
    }),

    getStudentEmailbyId: builder.query({
      query: ({id}) => ({
        url: `/get-student-email-by-id/${id}`,
      })
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useStoreStudentEmailMutation,
  useLoginUserMutation,
  useVerifyStudentEmailMutation,
  useResendOTPCodeMutation,
  useGetAuthenticatedUserQuery,
  useSendPasswordResetLinkEmailMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useVerifyInboundEmailMutation,
  useGetStudentEmailbyIdQuery
} = userAuthApi;