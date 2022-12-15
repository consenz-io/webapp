import { CircularProgress, Stack } from '@mui/material';
import { useUserRedirect } from 'hooks';
import { AuthContext } from 'contexts';
import { useContext } from 'react';

const Home = () => {
  useUserRedirect();
  const { jwt, loginWithRedirect } = useContext(AuthContext);
  if (!jwt) {
    loginWithRedirect();
  }
  return (
    <Stack style={{ height: '100vh' }} flexGrow={1} alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default Home;
