// routing/index.jsx

import { createContext, FC } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { IFCProps, IRoutingContext } from "types";
import { Home, Page404, Buttons, AllAgreements, Agreements, Welcome } from "../pages";
import { SidebarLayout } from "components";

const AGREEMENT_ROUTE = "/agreements";
const ALL_AGREEMENTS_ROUTE = "/:groupName/all-agreements";
const BUTTONS_ROUTE = "/buttons";
const HOME_ROUTE = "/";
const WELCOME_ROUTE = "/welcome";

const RoutingContext = createContext<IRoutingContext>({navigateToWelcome: () => ({})});

const RoutingProvider: FC<IFCProps> = ({ children }) => {
  const navigate = useNavigate();

  const routingState = {
    navigateToWelcome: () => navigate(WELCOME_ROUTE),
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
            <Route path={ALL_AGREEMENTS_ROUTE} element={<AllAgreements />} />
          </Route>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={AGREEMENT_ROUTE} element={<Agreements />} />
          <Route path={BUTTONS_ROUTE} element={<Buttons />} />
          <Route path={WELCOME_ROUTE} element={<Welcome />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RoutingProvider>
    </BrowserRouter>
  );
};

export { RoutesProvider, RoutingContext };