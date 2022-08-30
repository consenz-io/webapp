import { createContext, FC, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { IFCProps, IRoutingContext } from "types";
import {
  AgreementPage,
  Home,
  Page404,
  AllAgreements,
  NewAgreement,
  Welcome,
  CategoryPage,
  EmptyArchivePage,
} from "pages";
import { SidebarLayout } from "components";
import { GroupContext, GroupProvider } from "./group";
import { AgreementProvider } from "./agreement";
const HOME_ROUTE = "/";
const WELCOME_ROUTE = "/welcome";

const RoutingContext = createContext<IRoutingContext>({
  navigateToAllAgreements: () => ({}),
  navigateToWelcome: () => ({}),
});

const RoutingProvider: FC<IFCProps> = ({ children }) => {
  const navigate = useNavigate();

  const routingState = {
    navigateToWelcome: () => navigate(WELCOME_ROUTE),
    navigateToAllAgreements: (groupSlug: string | undefined) =>
      navigate(`/${groupSlug}/active-agreements`),
  };

  return (
    <RoutingContext.Provider value={routingState}>
      {children}
    </RoutingContext.Provider>
  );
};

const RoutesProvider: FC = () => {
  const { archivedAgreements } = useContext(GroupContext);
  return (
    <BrowserRouter>
      <RoutingProvider>
        <Routes>
          <Route path={`${HOME_ROUTE}/:groupSlug`} element={<GroupProvider />}>
            <Route element={<SidebarLayout />}>
              <Route path="active-agreements" element={<AllAgreements />} />
              <Route
                path="archive"
                element={
                  archivedAgreements ? (
                    <AllAgreements isArchive />
                  ) : (
                    <EmptyArchivePage />
                  )
                }
              />
              <Route path="cat/:categoryId" element={<CategoryPage />} />
              <Route path="new-agreement" element={<NewAgreement />} />
              <Route path="agreement" element={<AgreementProvider />}>
                <Route path=":agreementId" element={<AgreementPage />} />
              </Route>
            </Route>
          </Route>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={WELCOME_ROUTE} element={<Welcome />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RoutingProvider>
    </BrowserRouter>
  );
};

export { RoutesProvider, RoutingContext };
