import { useEffect, useContext } from 'react';
import { RoutingContext } from 'contexts';
import { DataContext } from 'contexts/data';
import { useNavigate } from 'react-router-dom';
const useUserRedirect = () => {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const { navigateToWelcome, navigateToAllAgreements } = useContext(RoutingContext);

  useEffect(() => {
    if (user) {
      const lastURl = sessionStorage.getItem('lastUrl');
      if (lastURl) {
        navigate(lastURl);
        return;
      }
      if (user.groups?.length) {
        navigateToAllAgreements(user.groups?.[0].slug);
      } else {
        navigateToWelcome();
      }
    }
  }, [navigateToAllAgreements, navigateToWelcome, user, navigate]);
};

export default useUserRedirect;
