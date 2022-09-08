import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataContext, RoutingContext } from 'contexts';
import * as router from 'react-router';
import { Home } from 'pages';

describe('useUserRedirect', () => {
  const navigate = jest.fn();
  const routingState = {
    navigateToWelcome: () => navigate('/welcome'),
    navigateToAllAgreements: (groupSlug: string | undefined) =>
      navigate(`/${groupSlug}/active-agreements`),
  };

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  test("redirect existing user with at least one group to his first group's all agreements screen", async () => {
    const dataState = {
      user: {
        id: 4,
        email: 'nadav@sofi.coop',
        groups: [{ id: 2, name: 'test-group', slug: 'test-group', color: '#000000' }],
      },
    };

    render(
      <DataContext.Provider value={dataState}>
        <RoutingContext.Provider value={routingState}>
          <Home />
        </RoutingContext.Provider>
      </DataContext.Provider>
    );
    expect(navigate).toHaveBeenCalledWith('/test-group/active-agreements');
  });

  test('redirect existing user without groups to welcome screen', async () => {
    const dataState = {
      user: {
        id: 4,
        email: 'nadav@sofi.coop',
      },
    };

    render(
      <DataContext.Provider value={dataState}>
        <RoutingContext.Provider value={routingState}>
          <Home />
        </RoutingContext.Provider>
      </DataContext.Provider>
    );
    expect(navigate).toHaveBeenCalledWith('/welcome');
  });
});
