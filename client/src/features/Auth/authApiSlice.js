import { apiSlice } from "../../app/apiSlice";
import { setUser, logoutUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     try {
      //       const { data } = await queryFulfilled;
      //       dispatch(setUser(data.email));
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   },
    }),
    confirmEmail: builder.mutation({
      query: (pin) => ({
        url: "/auth/verifyEmail",
        method: "POST",
        body: pin,
      }),
    }),
    configureStore: builder.mutation({
      query: (body) => ({
        url: "/auth/configureStore",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.email));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...rest }) => ({
        url: `/auth/resetPassword/${token}`,
        method: "POST",
        body: rest,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useConfirmEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useConfigureStoreMutation,
} = authApiSlice;
