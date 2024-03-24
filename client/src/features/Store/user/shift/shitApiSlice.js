import { apiSlice } from "../../../../app/apiSlice";

const shiftApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSHifts: builder.query({
      query: () => "/shift",
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Shift", id })),
              { type: "Shift", id: "LIST" },
            ]
          : [{ type: "Shift", id: "LIST" }],
    }),

    createShift: builder.mutation({
      query: (body) => ({
        url: `/shift`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Shift", id: "LIST" }],
    }),
    editShift: builder.mutation({
      query: ({ shiftId, body }) => ({
        url: `/shift/${shiftId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Shift", id: "LIST" }],
    }),
    deleteShift: builder.mutation({
      query: ({ shiftId }) => ({
        url: `/shift/${shiftId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Shift", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllSHiftsQuery,
  useCreateShiftMutation,
  useEditShiftMutation,
  useDeleteShiftMutation,
} = shiftApiSlice;
