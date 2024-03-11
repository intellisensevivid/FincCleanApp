import { apiSlice } from "../../../app/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customers",
        method: "POST",
        body: customerData,
      }),
    }),
    searchCustomers: builder.query({
      query: (searchTerm) => `/customers/search?query=${searchTerm}`,
    }),
  }),
});

export const { useCreateCustomerMutation, useLazySearchCustomersQuery } =
  customerApiSlice;
