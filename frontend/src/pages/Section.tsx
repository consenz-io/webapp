/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar } from 'components';
import { AgreementContext, SectionContext } from 'contexts';
import { FC, useContext, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { Chip, Stack } from '@mui/material';
import { t } from 'i18next';
import { StringBank } from 'strings';

const Section: FC = () => {
  const { section } = useContext(SectionContext);
  const { agreement } = useContext(AgreementContext);
  const [displayedVersion, setDisplayedVersion] = useState(section?.versions[0]);
  return (
    <>
      <Appbar
        breadcrumbs={[
          {
            name: agreement?.name ?? '',
            link: '..',
            icon: DocIcon,
          },
        ]}
      />
      <Stack direction="row" spacing={1} marginY={2}>
        {section?.versions.map((version, i) => (
          <Chip
            deleteIcon={<CheckCircleIcon />}
            onDelete={version.id === section.current_version?.id ? () => {} : undefined}
            onClick={() => setDisplayedVersion(version)}
            label={`${t(StringBank.VERSION)} ${i + 1}`}
            key={version.id}
            color={displayedVersion === version ? 'primary' : 'default'}
          />
        ))}
      </Stack>
    </>
  );
};

export default Section;
