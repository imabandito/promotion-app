/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { setUserAvatar, setUserAuth, logoutUser } from '../reducers/authSlice';
import { setMessageState } from '../reducers/messageSlice';
import { baseQueryWithReauth } from '../queries/apiQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAuth(data));
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Login error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: '/auth/signup',
        method: 'POST',
        body: newUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAuth(data));
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Signup error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Logout error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    refreshToken: builder.query({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAuth(data));
        } catch (error) {
          dispatch(logoutUser());
        }
      },
    }),
    updateUserInfo: builder.mutation({
      query: (newInfo) => ({
        url: '/auth/updateuserinfo',
        method: 'POST',
        body: newInfo,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAuth(data));
          dispatch(
            setMessageState({
              message: 'Successfully updated user info',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Update user info error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: '/auth/upload-avatar',
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAvatar(data.avatar));

          dispatch(
            setMessageState({
              message: 'Successfully updated user avatar',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Upload avatar error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/resetpassword',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setMessageState({
              message: 'Password successfully reseted!',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Reset password error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserAuth(data));
          // eslint-disable-next-line no-empty
        } catch (error: any) {}
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useUpdateUserInfoMutation,
  useUploadAvatarMutation,
  useResetPasswordMutation,
  useGetUserQuery,
} = authApi;
export default authApi;
