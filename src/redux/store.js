import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { dealsApi } from './features/dealSlice';
import { productsApi } from './features/apiSlice';
import { repliesApi } from './features/replySlice';
import { paymentsApi } from './features/paymentSlice';
import { commentsApi } from './features/commentSlice';
import { userAuthApi } from './features/userAuthSlice';
import { categoriesApi } from './features/categorySlice';
import { adminAuthApi } from './features/adminAuthSlice';
import { microBlogsApi } from './features/microBlogSlice';
import { dealOwnerAuthApi } from './features/dealOwnerAuthSlice';
import { dealActivitiesApi } from './features/dealActivitySlice';
import { microBlogReportsApi } from './features/microBlogReportSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [dealOwnerAuthApi.reducerPath]: dealOwnerAuthApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [dealsApi.reducerPath]: dealsApi.reducer,
    [microBlogsApi.reducerPath]: microBlogsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [dealActivitiesApi.reducerPath]: dealActivitiesApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [microBlogReportsApi.reducerPath]: microBlogReportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productsApi.middleware,
      categoriesApi.middleware,
      userAuthApi.middleware,
      dealOwnerAuthApi.middleware,
      adminAuthApi.middleware,
      dealsApi.middleware,
      microBlogsApi.middleware,
      commentsApi.middleware,
      repliesApi.middleware,
      dealActivitiesApi.middleware,
      paymentsApi.middleware,
      microBlogReportsApi.middleware,
    ]),
});
