import { useEffect, useState, useContext } from 'react';
import { RoutingContext } from 'contexts';
import { DataContext } from 'contexts/data';

const useUserRedirect = () => {
  const { user } = useContext(DataContext);
  const { navigateToWelcome, navigateToAllAgreements } = useContext(RoutingContext);
  const [name, setName] = useState('init');

  useEffect(() => {
    if (user) {
      if (user.groups?.length) {
        setName('groups');
        navigateToAllAgreements(user.groups?.[0].slug);
      } else {
        setName('no-groups');
        navigateToWelcome();
      }
    }
  }, [navigateToAllAgreements, navigateToWelcome, user]);

  return { name };
};

export default useUserRedirect;
