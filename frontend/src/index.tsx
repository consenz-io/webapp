import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DataProvider } from 'store';
import { ApiProvider } from './services';
import { RoutesProvider } from './routing';

const root = createRoot(document.getElementById('root') as HTMLElement); 
root.render(
  <StrictMode>
    <ApiProvider>
      <DataProvider>
          <RoutesProvider />
      </DataProvider>
    </ApiProvider>
  </StrictMode>
);