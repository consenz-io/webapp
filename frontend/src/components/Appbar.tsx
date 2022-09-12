import { FC } from 'react';
import { IconButton, Link, Stack, StepLabel, SvgIcon, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { ReactComponent as XLogo } from 'assets/icons/x-circle.svg';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ActionProps {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  onClickFn: () => void;
}

interface BreadcrumsProps {
  name: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  link?: string;
}

interface StepsProps {
  steps: string[];
  activeStep: number;
  onStepChange?: () => void;
}

interface AppbarProps {
  stepsSection: StepsProps;
  closeFn: () => void;
  actionsSection?: ActionProps[];
  breadcrumsSection?: BreadcrumsProps[];
}

const AppbarContainer = styled(Stack)`
  && {
    align-items: center;
    border-bottom: solid 1px #595f68;
    margin-top: -1rem;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 0 1rem;
    height: 57px;
  }
`;

const XIconWrapper = styled(SvgIcon)`
  svg path {
    fill: #adb2b8;
  }
`;

function renderBreadcrums(breadcrumsProps: BreadcrumsProps, index: number) {
  const Icon = breadcrumsProps.icon;
  return (
    <Stack direction="row" gap="0.5rem" justifyContent="center" alignItems="center" key={index}>
      {index > 0 && <KeyboardArrowRightIcon />}
      {Icon && <Icon />}
      <Typography fontSize="0.875rem" lineHeight="1.57" paddingTop="2px">
        {breadcrumsProps.link ? (
          <Link href={breadcrumsProps.link}>{breadcrumsProps.name}</Link>
        ) : (
          breadcrumsProps.name
        )}
      </Typography>
    </Stack>
  );
}

const Appbar: FC<AppbarProps> = (props) => {
  return (
    <AppbarContainer direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" gap="0.5rem" justifyContent="center" alignItems="center">
        {props.breadcrumsSection &&
          props.breadcrumsSection.length > 0 &&
          props.breadcrumsSection.map((breadcrumsObj, i) => renderBreadcrums(breadcrumsObj, i))}
      </Stack>
      <Stack direction="row">
        <Stepper nonLinear activeStep={props.stepsSection.activeStep - 1}>
          {props.stepsSection.steps.map((step, i) => (
            <Step
              disabled
              key={i}
              color="inherit"
              completed={props.stepsSection.activeStep > i + 1}
              sx={{ padding: '0 1rem' }}
            >
              <StepButton sx={{ padding: '0', margin: '0' }} disableRipple>
                <StepLabel
                  sx={{
                    '& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root': {
                      color: 'background.border',
                    },
                    '& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {step}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <IconButton>
        <XIconWrapper onClick={props.closeFn}>
          <XLogo />
        </XIconWrapper>
      </IconButton>
    </AppbarContainer>
  );
};

export default Appbar;
