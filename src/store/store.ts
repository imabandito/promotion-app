import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import authApi from './api/authApi';
import messageReducer from './reducers/messageSlice';
import articlesReducer from './reducers/articlesSlice';
import articlesApi from './api/articlesApi';
import weatherReducer from './reducers/weatherSlice';
import weatherApi from './api/weatherApi';
import widgetsReducer from './reducers/widgetsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    message: messageReducer,
    articles: articlesReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    weather: weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    widgets: widgetsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(articlesApi.middleware)
      .concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
