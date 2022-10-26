/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, ContentEditor } from 'components';
import { AgreementContext, SectionContext } from 'contexts';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from 'components/DropDownMenu/style';
import { useTranslation } from 'react-i18next';

const Section: FC = () => {
  const { section } = useContext(SectionContext);
  const { agreement } = useContext(AgreementContext);
  const [displayedVersion, setDisplayedVersion] = useState(section?.versions[0]);
  useEffect(() => {
    setDisplayedVersion(section?.versions[0]);
  }, [section]);
  const { t } = useTranslation();
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
      <Card variant="elevation" elevation={0}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <BtnCapital className="capital">{t(StringBank.ANONYMOUS)[0]}</BtnCapital>
              <Typography variant="h6">{t(StringBank.ANONYMOUS)}</Typography>
              <Typography variant="caption">
                {displayedVersion?.created_at?.toLocaleDateString(navigator.language)}
              </Typography>
            </Stack>
            <IconButton size="small">
              <LinkIcon />
            </IconButton>
          </Stack>
          <ContentEditor
            readonly
            initialContent={displayedVersion?.content}
            key={`version${displayedVersion?.id}`}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Section;
