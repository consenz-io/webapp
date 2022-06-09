import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "App";
import { Auth0Provider } from "@auth0/auth0-react";
const AUTH0_CLIENT_ID = "MITeFpxQlcYimynTQYYUfcMPeFqSOCiZ";
const AUTH0_DOMAIN = "soficoop.eu.auth0.com";
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="hasura"
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);

serviceWorkerRegistration.register();
