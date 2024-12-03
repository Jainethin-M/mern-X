import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you are using React 18 or above
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance for managing React Query
const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false
    }
  }
});

// Render the root component
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
