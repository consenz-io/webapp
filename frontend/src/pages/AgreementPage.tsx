import { Breadcrumbs, Link, Stack } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { FC, useContext } from 'react';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
const AgreementPage: FC = () => {
  const { name, categories } = useContext(GroupContext);
  console.log('categories', categories);
  console.log('name', name);
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('clicked breadcrumb');
  };
  return (
    <Stack direction="column">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          Cat name
        </Link>
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          <SummarizeOutlinedIcon />
          Agreement name
        </Link>
      </Breadcrumbs>
      <h1>Agreement page</h1>
    </Stack>
  );
};

export default AgreementPage;
