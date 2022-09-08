import { useEffect, useContext } from 'react';
import { RoutingContext } from 'contexts';
import { DataContext } from 'contexts/data';

const useUserRedirect = () => {
  const { user } = useContext(DataContext);
  const { navigateToWelcome, navigateToAllAgreements } = useContext(RoutingContext);

  useEffect(() => {
    if (user) {
      if (user.groups?.length) {
        navigateToAllAgreements(user.groups?.[0].slug);
      } else {
        navigateToWelcome();
      }
    }
  }, [navigateToAllAgreements, navigateToWelcome, user]);
};

export default useUserRedirect;
