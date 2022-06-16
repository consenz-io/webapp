import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utils/i18n";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
