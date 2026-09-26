import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('intellitrack_token') || null;
const refreshToken = localStorage.getItem('intellitrack_refresh_token') || null;
const storedUser = localStorage.getItem('intellitrack_user');

let initialUser = null;
if (storedUser) {
  try {
    initialUser = JSON.parse(storedUser);
  } catch {
    initialUser = null;
  }
}

const initialState = {
  user: initialUser,
  token: token,
  refreshToken: refreshToken,
  isAuthenticated: !!token && !!initialUser,
  role: initialUser?.role || 'INVESTIGATOR',
  activeRole: initialUser?.role || 'INVESTIGATOR',
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      if (refreshToken) {
        state.refreshToken = refreshToken;
        localStorage.setItem('intellitrack_refresh_token', refreshToken);
      }
      state.isAuthenticated = true;
      state.role = user.role;
      state.activeRole = user.role;

      localStorage.setItem('intellitrack_token', accessToken);
      localStorage.setItem('intellitrack_user', JSON.stringify(user));
      localStorage.setItem('intellitrack_role', user.role);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('intellitrack_user', JSON.stringify(state.user));
    },
    switchRole: (state, action) => {
      state.activeRole = action.payload;
      localStorage.setItem('intellitrack_role', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.role = 'VIEWER';
      state.activeRole = 'VIEWER';

      localStorage.removeItem('intellitrack_token');
      localStorage.removeItem('intellitrack_refresh_token');
      localStorage.removeItem('intellitrack_user');
      localStorage.removeItem('intellitrack_role');
    },
  },
});

export const { setCredentials, updateUser, switchRole, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectActiveRole = (state) => state.auth.activeRole;

export default authSlice.reducer;
