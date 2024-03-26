import { apiSlice } from "../../app/apiSlice";

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStore: builder.query({
      query: () => ({
        url: "/store/account",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStoreQuery } = storeApiSlice;
