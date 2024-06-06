import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allDataObject, discountItemsTypes, itemTypes } from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh1", "refresh2"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getCompositeData: builder.query<allDataObject, void>({
      query: () => "items/all-items",
      providesTags: ["refresh1"],
    }),
    deleteCompositeData: builder.mutation<void, number>({
      query: (id) => ({
        url: `items/all-delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    getAllItems: builder.query<itemTypes[], void>({
      query: () => "items/get-items",
      providesTags: ["refresh2"],
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
      invalidatesTags: ["refresh2"],
    }),
    postSaleItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "sale-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh2"],
    }),
    postStockClearItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "stock-clear-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh2"],
    }),
    deleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),
    updateItem: builder.mutation<void, itemTypes>({
      query: ({ id, ...rest }) => ({
        url: `items/update-item?${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["refresh2"],
    }),
  }),
});

export const {
  useGetCompositeDataQuery,
  useDeleteCompositeDataMutation,
  useGetAllItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  usePostSaleItemMutation,
  usePostStockClearItemMutation,
  useDeleteItemMutation,
} = appApi;
