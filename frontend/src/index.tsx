import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utils/i18n";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </StrictMode>
);

serviceWorkerRegistration.register();
