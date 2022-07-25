import { createContext, FC } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { IFCProps, IRoutingContext } from 'types';
import { Home, Page404, AllAgreements, NewAgreement, Welcome } from 'pages';
import { SidebarLayout } from 'components';

const HOME_ROUTE = '/';
const WELCOME_ROUTE = '/welcome';

const RoutingContext = createContext<IRoutingContext>({
  navigateToAllAgreements: () => ({}),
  navigateToWelcome: () => ({}),
});

const RoutingProvider: FC<IFCProps> = ({ children }) => {
  const navigate = useNavigate();

  const routingState = {
    navigateToWelcome: () => navigate(WELCOME_ROUTE),
    navigateToAllAgreements: (groupSlug: string | undefined) =>
      navigate(`/${groupSlug}/all-agreements`),
  };

  return <RoutingContext.Provider value={routingState}>{children}</RoutingContext.Provider>;
};

const RoutesProvider: FC = () => {
  return (
    <BrowserRouter>
      <RoutingProvider>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path={`${HOME_ROUTE}/:groupSlug/all-agreements`} element={<AllAgreements />} />
            <Route path={`${HOME_ROUTE}/:groupSlug/new-agreement`} element={<NewAgreement />} />
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
