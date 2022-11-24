import { FC } from 'react';
import {
  Breadcrumbs,
  Button,
  IconButton,
  Stack,
  StepLabel,
  SvgIcon,
  Typography,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import styled from 'styled-components';
import { ReactComponent as ArrowLogo } from 'assets/icons/chevron-left.svg';
import { backgroundBorderColor } from 'theme';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface Action {
  icon: JSX.Element;
  title?: string;
  onClick: () => void;
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
    border-bottom: solid 1px ${backgroundBorderColor};
    margin-top: -1rem;
    padding: 0 1rem;
    height: 57px;
  }
`;

const Appbar: FC<AppbarProps> = (props) => {
  const { i18n } = useTranslation();
  return (
    <AppbarContainer
      direction="row"
      alignItems="center"
      marginX={-1}
      justifyContent="space-between"
    >
      {props.breadcrumbs?.length && (
        <Breadcrumbs
          separator={
            <ArrowLogo fontSize="1rem" transform={i18n.language === 'en' ? '' : 'rotate(180)'} />
          }
          sx={{ flexBasis: 'calc(100%/3)', flexGrow: 1 }}
        >
          {props.breadcrumbs.map((breadcrumb, i) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
              component={breadcrumb.link ? Link : Stack}
              to={breadcrumb.link ?? ''}
              key={i}
              sx={{ textDecoration: 'none' }}
            >
              {breadcrumb.icon && <breadcrumb.icon />}
              <Typography
                variant="body2"
                color={i === (props.breadcrumbs?.length || 0) - 1 ? 'white' : 'GrayText'}
              >
                {breadcrumb.name}
              </Typography>
            </Stack>
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
                  <StepLabel StepIconProps={{ sx: { paddingX: '1rem' } }}>{step}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Stack>
      )}
      {props.actions && props.actions.length > 0 && (
        <Stack id="actions" direction="row" justifyContent="flex-end" flexBasis="calc(100%/3)">
          {props.actions.map((action, j) =>
            action.title ? (
              <Button
                key={j}
                onClick={action.onClick}
                startIcon={action.icon}
                size="small"
                color="primary"
              >
                {action.title}
              </Button>
            ) : (
              <IconButton key={j} onClick={action.onClick}>
                <SvgIcon>{action.icon}</SvgIcon>
              </IconButton>
            )
          )}
        </Stack>
      )}
    </AppbarContainer>
  );
};

export default Appbar;
