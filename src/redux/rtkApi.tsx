import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { itemTypes } from "../types/types";

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
  }),
});

export const { useGetAllItemsQuery, useGetOneItemQuery } = appApi;
