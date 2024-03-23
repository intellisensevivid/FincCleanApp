import { apiSlice } from "../../../app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreUsers: builder.query({
      query: (searchTerm) => `/users/search?query=${searchTerm}`,
    }),

    getStoreUsers: builder.query({
      query: () => "/users/store",
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
    }),
    editStoreUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Users", id: userId },
      ],
    }),
    deleteStoreUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/delete`,
        method: "DELETE",
        body,
      }),
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
