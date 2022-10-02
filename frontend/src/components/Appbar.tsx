import { FC } from 'react';
import {
  Breadcrumbs,
  IconButton,
  Link,
  Stack,
  StepLabel,
  SvgIcon,
  Typography,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import styled from 'styled-components';
import { ReactComponent as ArrowLogo } from 'assets/icons/chevron-down.svg';
import { backgroundBorderColor } from 'theme';

export interface ActionProps {
  icon: JSX.Element;
  onClickFn: () => void;
}

export interface BreadcrumsProps {
  name: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  link?: string | undefined;
}

export interface StepsProps {
  steps: string[];
  activeStep: number;
  onStepChange?: () => void;
}

interface AppbarProps {
  stepperSection?: StepsProps;
  actionsSection?: ActionProps[];
  breadcrumsSection?: BreadcrumsProps[];
}

const AppbarContainer = styled(Stack)`
  && {
    align-items: center;
    border-bottom: solid 1px ${backgroundBorderColor};
    margin-top: -1rem;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 0 1rem;
    height: 57px;
  }
`;

function renderBreadcrums(breadcrumsProps: BreadcrumsProps[]) {
  return (
    <Stack direction="row" alignItems="center" flexGrow={1}>
      <Breadcrumbs separator={<ArrowLogo fontSize="1rem" />} aria-label="breadcrumb">
        {breadcrumsProps.map((breadcrumObj, i) => {
          const Icon = breadcrumObj.icon;
          if (breadcrumObj.link) {
            return (
              <Link key={i} underline="hover" justifyContent="center" href={breadcrumObj.link}>
                <Typography
                  variant="body2"
                  color={i === breadcrumsProps.length - 1 ? 'white' : 'GrayText'}
                >
                  <Stack direction="row" justifyContent="center" alignItems="center" gap="0.5rem">
                    {Icon && <Icon />}
                    {breadcrumObj.name}
                  </Stack>
                </Typography>
              </Link>
            );
          }
          return (
            <Typography
              key={i}
              variant="body2"
              lineHeight="2.58"
              padding="0.12rem"
              color={i === breadcrumsProps.length - 1 ? 'white' : 'GrayText'}
            >
              <Stack direction="row" justifyContent="center" alignItems="center" gap="0.5rem">
                {Icon && <Icon />}
                {breadcrumObj.name}
              </Stack>
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}

const Appbar: FC<AppbarProps> = (props) => {
  return (
    <AppbarContainer direction="row" alignItems="center">
      {props.breadcrumsSection &&
        props.breadcrumsSection.length > 0 &&
        renderBreadcrums(props.breadcrumsSection)}
      {props.stepperSection && props.stepperSection.activeStep && (
        <Stack direction="row" justifyContent="center">
          <Stepper nonLinear activeStep={props.stepperSection.activeStep - 1}>
            {props.stepperSection.steps.map((step, i) => (
              <Step
                disabled
                key={i}
                color="inherit"
                completed={props.stepperSection && props.stepperSection.activeStep > i + 1}
                sx={{ padding: '0 1rem' }}
              >
                <StepButton sx={{ padding: '0', margin: '0' }} disableRipple>
                  <StepLabel>{step}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Stack>
      )}
      {props.actionsSection && props.actionsSection.length > 0 && (
        <Stack id="actions" direction="row" justifyContent="flex-end" flexGrow={1}>
          {props.actionsSection.map((actionObj, j) => (
            <IconButton key={j} onClick={actionObj.onClickFn}>
              <SvgIcon>{actionObj.icon}</SvgIcon>
            </IconButton>
          ))}
        </Stack>
      )}
    </AppbarContainer>
  );
};

export default Appbar;
