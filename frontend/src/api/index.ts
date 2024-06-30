import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NormalStoreTypes, allDataTypes } from "../types/types";

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
  }),
});

export const {
  useResetMutationStateMutation,
  useGetAllItemsQuery,
  useGetOneItemQuery,
  usePostItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = appApi;
