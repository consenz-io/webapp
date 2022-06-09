// routing/index.jsx

import { createContext, FC } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FCProps, IRoutingContext } from "./types";
import { Home, Page404, Login } from "../pages";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";

const RoutingContext = createContext<IRoutingContext | null>(null);

const RoutingProvider: FC<FCProps> = ({ children }) => {
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
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RoutingProvider>
    </BrowserRouter>
  );
};

export { RoutesProvider, RoutingContext };
