import { apiSlice } from "../../app/apiSlice";

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStore: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetStoreMutation } = storeApiSlice;
