// routing/index.jsx

import { createContext, FC } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { IFCProps, IRoutingContext } from "./types";
import { Home, Page404, Login, Buttons, AllAgreements, Agreements } from "../pages";
import { SidebarLayout } from "components";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";
const BUTTONS_ROUTE = "/buttons";
const ALL_AGREEMENTS_ROUTE = "/:groupName/all-agreements";
const AGREEMENT_ROUTE = "/agreements";
// const LOGIN_ROUTE = `https://soficoop.eu.auth0.com/authorize?
// response_type=token&
// client_id=MITeFpxQlcYimynTQYYUfcMPeFqSOCiZ&
// redirect_uri=http://localhost:3000`;

const RoutingContext = createContext<IRoutingContext | null>(null);

const RoutingProvider: FC<IFCProps> = ({ children }) => {
  const navigate = useNavigate();

  const routingState = {
    navigateToHome: () => navigate(HOME_ROUTE),
  };

  return (
    <RoutingContext.Provider value={routingState}>
      {children}
    </RoutingContext.Provider>
  );
};

const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <RoutingProvider>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path={HOME_ROUTE} element={<Home />} />
          </Route>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={BUTTONS_ROUTE} element={<Buttons />} />
          <Route path={ALL_AGREEMENTS_ROUTE} element={<AllAgreements />} />
          <Route path={AGREEMENT_ROUTE} element={<Agreements />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RoutingProvider>
    </BrowserRouter>
  );
};

export { RoutesProvider, RoutingContext };
