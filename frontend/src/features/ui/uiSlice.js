import { createSlice } from '@reduxjs/toolkit';

const preferredTheme = localStorage.getItem('waste-theme') || 'system';
const preferredLanguage = localStorage.getItem('waste-lang') || 'en';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: preferredTheme,
    language: preferredLanguage,
    sidebarOpen: true,
    notificationsOpen: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('waste-theme', action.payload);
      document.body.classList.toggle('dark', action.payload === 'dark');
    },
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem('waste-lang', action.payload);
    },
    toggleNotifications(state) {
      state.notificationsOpen = !state.notificationsOpen;
    },
  },
});

export const { toggleSidebar, setTheme, setLanguage, toggleNotifications } = uiSlice.actions;

export default uiSlice.reducer;

