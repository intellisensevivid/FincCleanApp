import { apiSlice } from "../../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreUsers: builder.query({
      query: (searchTerm) => `/users/search?query=${searchTerm}`,
    }),

    getStoreUsers: builder.query({
      query: () => "/users/store",
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserRoles: builder.query({
      query: () => "/users/roles",
    }),
    addStoreUser: builder.mutation({
      query: (body) => ({
        url: "/users/create",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),
    editStoreUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),
    deleteStoreUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetAllStoreUsersQuery,
  useGetUserRolesQuery,
  useGetStoreUsersQuery,
  useAddStoreUserMutation,
  useEditStoreUserMutation,
  useDeleteStoreUserMutation,
} = userApiSlice;
