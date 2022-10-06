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

export interface Action {
  icon: JSX.Element;
  onClickFn: () => void;
}

export interface Breadcrumb {
  name: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  link?: string | undefined;
}

export interface StepperMeta {
  steps: string[];
  activeStep: number;
  onStepChange?: () => void;
}

interface AppbarProps {
  stepper?: StepperMeta;
  actions?: Action[];
  breadcrumbs?: Breadcrumb[];
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

const Appbar: FC<AppbarProps> = (props) => {
  return (
    <AppbarContainer direction="row" alignItems="center">
      {props.breadcrumbs?.length && (
        <Breadcrumbs
          separator={<ArrowLogo fontSize="1rem" />}
          aria-label="breadcrumb"
          sx={{ flexBasis: 'calc(100%/3)' }}
        >
          {props.breadcrumbs.map((breadcrumb, i) => (
            <Link key={i} underline="none" justifyContent="center" href={breadcrumb.link}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {breadcrumb.icon && <breadcrumb.icon />}
                <Typography
                  variant="body2"
                  color={i === (props.breadcrumbs?.length || 0) - 1 ? 'white' : 'GrayText'}
                >
                  {breadcrumb.name}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Breadcrumbs>
      )}
      {props.stepper && props.stepper.activeStep && (
        <Stack flexBasis="calc(100%/3)" alignItems="center">
          <Stepper nonLinear activeStep={props.stepper.activeStep - 1}>
            {props.stepper.steps.map((step, i) => (
              <Step
                disabled
                key={i}
                color="inherit"
                completed={props.stepper && props.stepper.activeStep > i + 1}
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
      {props.actions && props.actions.length > 0 && (
        <Stack id="actions" direction="row" justifyContent="flex-end" flexBasis="calc(100%/3)">
          {props.actions.map((actionObj, j) => (
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
