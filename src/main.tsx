import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  debug: import.meta.env.MODE === 'development',
});


console.log("PostHog status:", posthog);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter
        basename={import.meta.env.MODE === 'production' ? "/simpleTemplate" : "/"}
      >
        <App/>
      </BrowserRouter>
    </PostHogProvider>
  </React.StrictMode>,
);
