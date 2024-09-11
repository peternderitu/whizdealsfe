import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products',
    }),
    addTodo: builder.mutation({
      query: ({todo, completed, userId}) => ({
        url: 'todos/add',
        method: 'POST',
        body: {
          todo, completed, userId
        }
      })
    })
  }),
});

export const { useGetAllProductsQuery, useAddTodoMutation } = productsApi;
 