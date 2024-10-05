/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setMessageState } from '../reducers/messageSlice';
import { setWeather } from '../reducers/weatherSlice';
import { setWidgetsStatuses } from '../reducers/widgetsSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_WEATHER_API_URL,
});

const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (q) => ({
        url: `/current.json`,
        method: 'GET',
        params: {
          key: import.meta.env.VITE_WEATHER_API_KEY,
          q,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWeather(data));
        } catch (error: any) {
          dispatch(
            setMessageState({
              type: 'error',
              message: 'Unable to get weather',
              text: error?.error?.data?.message,
            })
          );
          dispatch(
            setWidgetsStatuses({
              weather: 'rejected',
            })
          );
        }
      },
    }),
  }),
});

export const { useGetWeatherQuery, useLazyGetWeatherQuery } = weatherApi;
export default weatherApi;
