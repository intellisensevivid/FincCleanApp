import { apiSlice } from "../../../app/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
