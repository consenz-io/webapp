import { createContext, FC } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { IFCProps } from 'types';
import {
  Agreement,
  Home,
  Page404,
  AllAgreements,
  NewAgreement,
  Welcome,
  AllArchievedAgreements,
  CategoryAgreements,
  Section,
} from 'pages';
import { SidebarLayout } from 'components';
import { GroupProvider } from './group';
import { AgreementProvider } from './agreement';
import { SectionProvider } from './section';
import Draft from '../pages/Draft';
const HOME_ROUTE = '/';
const WELCOME_ROUTE = '/welcome';

interface RoutingState {
  navigateToWelcome: () => void;
  navigateToAllAgreements: (groupSlug: string | undefined) => void;
}

const RoutingContext = createContext<RoutingState>({
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

  return <RoutingContext.Provider value={routingState}>{children}</RoutingContext.Provider>;
};

const RoutesProvider: FC = () => {
  return (
    <BrowserRouter>
      <RoutingProvider>
        <Routes>
          <Route path={`${HOME_ROUTE}/:groupSlug`} element={<GroupProvider />}>
            <Route element={<SidebarLayout />}>
              <Route path="active-agreements" element={<AllAgreements />} />
              <Route path="archive" element={<AllArchievedAgreements />} />
              <Route path="cat/:categoryId" element={<CategoryAgreements />} />
              <Route element={<AgreementProvider />}>
                <Route path="new-agreement" element={<NewAgreement />} />
                <Route path="agreement">
                  <Route path=":agreementId">
                    <Route path="" element={<Agreement />} />
                    <Route
                      path="section/:sectionId/:versionId"
                      element={
                        <SectionProvider>
                          <Section />
                        </SectionProvider>
                      }
                    />
                    <Route path="draft" element={<Draft />} />
                  </Route>
                </Route>
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
