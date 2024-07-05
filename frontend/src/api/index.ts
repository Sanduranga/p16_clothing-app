import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  NormalStoreTypes,
  allDataTypes,
  saleItemsTypes,
  stockClearItemsTypes,
} from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh1", "refresh2"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
  }),
  endpoints: (builder) => ({
    getAllItems: builder.query<NormalStoreTypes[], void>({
      query: () => "items/get-items",
      providesTags: ["refresh2"],
    }),
    getOneItem: builder.query<allDataTypes, string>({
      query: (id) => `items/get-item?id=${id}`,
    }),
    postItem: builder.mutation<void, NormalStoreTypes>({
      query: (data) => ({
        url: "items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    updateItem: builder.mutation<void, NormalStoreTypes>({
      query: (body) => ({
        url: "items/update-item",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (code) => ({
        url: `items/delete-item?code=${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),
    resetMutationState: builder.mutation({
      queryFn: () => ({ data: null }),
    }),

    // sale-items actions

    getAllSaleItems: builder.query<saleItemsTypes[], void>({
      query: () => "sale-items/get-items",
      providesTags: ["refresh2"],
    }),

    postSaleItem: builder.mutation<void, saleItemsTypes>({
      query: (data) => ({
        url: "sale-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),

    deleteSaleItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `sale-items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),

    // stock-clear-items actions

    getAllStockClearItems: builder.query<stockClearItemsTypes[], void>({
      query: () => "stock-clear-items/get-items",
      providesTags: ["refresh2"],
    }),

    postStockClearItem: builder.mutation<void, stockClearItemsTypes>({
      query: (data) => ({
        url: "stock-clear-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),

    deleteStockClearItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `stock-clear-items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),
  }),
});

export const {
  useResetMutationStateMutation,
  useGetAllItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetAllSaleItemsQuery,
  usePostSaleItemMutation,
  useDeleteSaleItemMutation,
  useGetAllStockClearItemsQuery,
  usePostStockClearItemMutation,
  useDeleteStockClearItemMutation,
} = appApi;
