import {createContext, FC, useContext, useEffect} from "react";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {IFCProps, IRoutingContext} from "./types";
import {Home, Page404, Login, AllAgreements} from "../pages";
import {SidebarLayout} from "components";
import {LOGIN_ROUTE, HOME_ROUTE} from "consts";
import {useAuth0} from "@auth0/auth0-react";
import {DataContext} from "store";
import {useUser} from "../hooks";
// const LOGIN_ROUTE = `https://soficoop.eu.auth0.com/authorize?
// response_type=token&
// client_id=MITeFpxQlcYimynTQYYUfcMPeFqSOCiZ&
// redirect_uri=http://localhost:3000`;

const RoutingContext = createContext<IRoutingContext | null>(null);

const RoutingProvider :FC<IFCProps> = ({ children }) => {
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
  const { user } = useAuth0();
  const { groups } = useUser();
  const {setGlobalUserData} = useContext(DataContext);

  useEffect(()=> {
    if (user) {
      const name: string = user.given_name || user.nickname || "";

      if (setGlobalUserData) { //TODO @aviran: how to ts define setGlobalUserData to make it more  it's not elegant?
        setGlobalUserData({
          name,
          groups,
          currentGroup: 0
        });
      }
    }
  },[user, groups]);

  return (
    <BrowserRouter>
      <RoutingProvider>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={`${HOME_ROUTE}/:groupSlug/all-agreements`} element={<AllAgreements />} />
          </Route>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RoutingProvider>
    </BrowserRouter>
  );
};

export { RoutesProvider, RoutingContext };
