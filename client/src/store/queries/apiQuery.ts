import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {
  User,
  setUserAuth,
  logoutUser,
} from '../reducers/authSlice';

interface RefreshResult {
  token: string;
  user: User;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshResult;
      api.dispatch(setUserAuth(data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};
