import { useContext, useEffect } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { RoutingContext } from 'contexts';
import { DataContext } from 'contexts/data';

const Home = () => {
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

  return (
    <Stack style={{ height: '100vh' }} flexGrow={1} alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default Home;
