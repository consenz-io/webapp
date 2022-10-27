import { Box, Stack } from '@mui/material';
import AgreementCard from 'components/AgreementCard';
import { FC } from 'react';
import { IAgreement } from 'types';

const AgreementCarousel: FC<{ agreements: IAgreement[] }> = ({ agreements }) => {
  return (
    <Stack flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ sx: 'nowrap', sm: 'wrap' }}>
      {agreements.map((agreement: IAgreement) => (
        <Box
          key={agreement.id}
          flexBasis={{ xs: '25%', sm: '33%', lg: '25%', xl: '20%' }}
          padding={1}
          minWidth="0"
        >
          <AgreementCard
            id={agreement.id}
            participants={14}
            category={agreement.category?.name}
            title={agreement.name}
            updatedAt={agreement.updated_at}
            rationale={agreement.rationale}
            isArchived={agreement.is_archived}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default AgreementCarousel;
