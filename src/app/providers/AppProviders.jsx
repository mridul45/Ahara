import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import store from '@app/store';
import { initReactQueryPersistence, queryClient } from '@shared/api/reactQueryClient.js';

if (typeof window !== 'undefined') {
  initReactQueryPersistence();
}

function AppProviders({ children }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/Ahara/">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}

export default AppProviders;
