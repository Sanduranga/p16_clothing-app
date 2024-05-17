import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { itemTypes } from "../types/types";

export const appApi = createApi({
  reducerPath: "appApis",
  tagTypes: ["refresh"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getAllproducts: builder.query<itemTypes[], void>({
      query: () => "items/get-items",
      providesTags: ["refresh"],
    }),
  }),
});

export const { useGetAllproductsQuery } = appApi;
