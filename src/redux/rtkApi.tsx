import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { discountItemsTypes, itemTypes } from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getAllItems: builder.query<itemTypes[], void>({
      query: () => "items/get-items",
      providesTags: ["refresh"],
    }),
    getOneItem: builder.query<itemTypes, string>({
      query: (id) => `items/get-item?id=${id}`,
    }),
    postItem: builder.mutation<void, itemTypes>({
      query: (data) => ({
        url: "items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh"],
    }),
    postSaleItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "sale-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh"],
    }),
    postStockClearItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "stock-clear-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh"],
    }),
    updateItem: builder.mutation<void, itemTypes>({
      query: ({ id, ...rest }) => ({
        url: `items/update-item?${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["refresh"],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  usePostSaleItemMutation,
  usePostStockClearItemMutation,
  useDeleteItemMutation,
} = appApi;
