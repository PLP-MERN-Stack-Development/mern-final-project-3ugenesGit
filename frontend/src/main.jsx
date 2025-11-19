import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import { store } from './store';
import i18n from './lib/i18n';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { registerServiceWorker } from './lib/pwa';

const queryClient = new QueryClient();

registerServiceWorker();

const savedTheme = localStorage.getItem('waste-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
