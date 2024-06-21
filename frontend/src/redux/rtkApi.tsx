import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allDataObject,
  discountItemsTypes,
  itemTypes,
  postItemTypes,
} from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh1", "refresh2"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getCompositeData: builder.query<allDataObject, void>({
      query: () => "items/all-items",
      providesTags: ["refresh1", "refresh2"],
    }),
    deleteCompositeData: builder.mutation<string, string>({
      query: (code) => ({
        url: `items/all-delete-item?code=${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    getAllItems: builder.query<itemTypes[], void>({
      query: () => "items/get-items",
      providesTags: ["refresh2"],
    }),
    getAllSalesItems: builder.query<itemTypes[], void>({
      query: () => "sale-items/get-items",
      providesTags: ["refresh2"],
    }),
    getOneItem: builder.query<itemTypes, string>({
      query: (id) => `items/get-item?id=${id}`,
    }),
    postItem: builder.mutation<void, postItemTypes>({
      query: (data) => ({
        url: "items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    postSaleItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "sale-items/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refresh1", "refresh2"],
    }),
    postStockClearItem: builder.mutation<void, discountItemsTypes>({
      query: (data) => ({
        url: "stock-clear-items/add-item",
        method: "POST",
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
    updateItem: builder.mutation<void, itemTypes>({
      query: ({ id, ...rest }) => ({
        url: `items/update-item?${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["refresh2"],
    }),
    resetMutationState: builder.mutation({
      queryFn: () => ({ data: null }),
    }),
  }),
});

export const {
  useGetCompositeDataQuery,
  useDeleteCompositeDataMutation,
  useGetAllItemsQuery,
  useGetAllSalesItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  usePostSaleItemMutation,
  usePostStockClearItemMutation,
  useDeleteItemMutation,
  useResetMutationStateMutation,
} = appApi;
