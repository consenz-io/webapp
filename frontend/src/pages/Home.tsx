import { CircularProgress, Stack } from '@mui/material';
import { useUserRedirect } from 'hooks';

const Home = () => {
  useUserRedirect();

  return (
    <Stack style={{ height: '100vh' }} flexGrow={1} alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
};

export default Home;
