import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  NormalStoreTypes,
  allDataTypes,
  composeDataObjects,
} from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh1", "refresh2"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
  }),
  endpoints: (builder) => ({
    // composite api's   *************************

    getCompositeData: builder.query<composeDataObjects, void>({
      query: () => "composite/all-items",
      providesTags: ["refresh1", "refresh2"],
    }),
    deleteCompositeData: builder.mutation<void, string>({
      query: (code) => ({
        url: `composite/all-delete-item?code=${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    resetMutationState: builder.mutation({
      queryFn: () => ({ data: null }),
    }),

    //  normal section api's   *********************

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
      query: (data) => ({
        url: "items/update-item",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    deleteItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),

    // sale section api's  *************************

    getAllSaleItems: builder.query<allDataTypes[], void>({
      query: () => "sale-items/get-items",
      providesTags: ["refresh2"],
    }),
    getOneSaleItem: builder.query<allDataTypes, string>({
      query: (id) => `sale-items/get-item?id=${id}`,
    }),
    postSaleItem: builder.mutation<void, allDataTypes>({
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

    // stock clearing section api's   *************

    getAllStockItems: builder.query<allDataTypes[], void>({
      query: () => "stock-clear-items/get-items",
      providesTags: ["refresh2"],
    }),
    getOneStockItem: builder.query<allDataTypes, string>({
      query: (id) => `stock-clear-items/get-item?id=${id}`,
    }),
    postStockItem: builder.mutation<void, allDataTypes>({
      query: (data) => ({
        url: "stock-clear-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    deleteStockItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `stock-clear-items/delete-item?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh2"],
    }),
  }),
});

export const {
  useGetCompositeDataQuery,
  useDeleteCompositeDataMutation,
  useResetMutationStateMutation,
  useGetAllItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetAllSaleItemsQuery,
  useGetOneSaleItemQuery,
  usePostSaleItemMutation,
  useDeleteSaleItemMutation,
  useGetAllStockItemsQuery,
  useGetOneStockItemQuery,
  usePostStockItemMutation,
  useDeleteStockItemMutation,
} = appApi;
