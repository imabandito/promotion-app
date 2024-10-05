/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { setMessageState } from '../reducers/messageSlice';
import { baseQueryWithReauth } from '../queries/apiQuery';
import {
  IArticle,
  ICategory,
  setCategories,
} from '../reducers/articlesSlice';

const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ q, sort, filter }) => ({
        url: '/articles',
        method: 'GET',
        params: {
          ...(q && { q }),
          ...(sort && { sort }),
          ...(filter && { filter }),
        },
      }),
      providesTags:['Articles'],
      transformResponse:(response:{articles:IArticle[]})=>response.articles,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Get articles error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    getArticle: builder.query({
      query: (id) => ({
        url: `/articles/article/${id}`,
        method: 'GET',
      }),
      transformResponse:(response:{article:IArticle})=>response.article,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;          
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Get article error',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: '/articles/new',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Articles'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setMessageState({
              message: 'Article successfully added!',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Unable to add article',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    getCategories: builder.query({
      query: () => ({
        url: '/articles/categories',
        method: 'GET',
      }),
      transformResponse:(response:{categories:ICategory[]})=>response.categories,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCategories(data));
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Unable to get categories',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Articles'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setMessageState({
              message: 'Article successfully deleted!',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Unable to delete article',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
    editArticle: builder.mutation({
      query: ({ data, id }) => ({
        url: `/articles/edit/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Articles'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setMessageState({
              message: 'Article successfully edited!',
              type: 'success',
            })
          );
        } catch (error: any) {
          dispatch(
            setMessageState({
              message: 'Unable to edit article',
              text: error?.error?.data?.message,
              type: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const {
  useAddArticleMutation,
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useDeleteArticleMutation,
  useGetArticleQuery,
  useLazyGetCategoriesQuery,
  useLazyGetArticlesQuery,
  useEditArticleMutation,
} = articlesApi;
export default articlesApi;
