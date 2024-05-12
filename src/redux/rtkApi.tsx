import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProductsTypes } from "./types/reduxTypes";

export const appApi = createApi({
  reducerPath: "appApis",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllproducts: builder.query<allProductsTypes[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetAllproductsQuery } = appApi;
