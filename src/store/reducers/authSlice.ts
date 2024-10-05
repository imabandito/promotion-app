import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  age?: number;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean
}


const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, {payload: {token}}: PayloadAction<{ token?: string }>) => {      
    if(token){
      localStorage.setItem('token', token);
    }
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
    setUser: (state, {payload:{user}}: PayloadAction<{ user: User }>) => {
      state.user = user
      state.isAuthenticated = true;
    },
    setUserAvatar: (state, {payload}: PayloadAction<string>) => {
      if(state.user){
        state.user.avatar = payload;
      }
    },
    removeUser: (state) => {
      state.user = null
    },
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUserAuth: (state, {payload:{token, user}}:PayloadAction<{ token?: string, user?: User}>) =>{
      if(token){
        localStorage.setItem('token', token);
      }
      if(user){
        state.user = user
      }
        state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setAuth, clearAuth, setUser, removeUser, setLoading, setUserAvatar, setUserAuth, logoutUser } = authSlice.actions;

export default authSlice.reducer;
