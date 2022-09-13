import { FC } from 'react';
import { IconButton, Link, Stack, StepLabel, SvgIcon, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ActionProps {
  icon: JSX.Element;
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
  stepperSection?: StepsProps;
  actionsSection?: ActionProps[];
  breadcrumsSection?: BreadcrumsProps[];
}

const AppbarContainer = styled(Stack)`
  && {
    align-items: center;
    border-bottom: solid 1px #595f68;
    margin-top: -0.5rem;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 0 1rem;
    height: 57px;
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
      <Stack
        id="breadcrums"
        direction="row"
        gap="0.5rem"
        justifyContent="flex-start"
        alignItems="center"
        flexGrow={1}
      >
        {props.breadcrumsSection &&
          props.breadcrumsSection.length > 0 &&
          props.breadcrumsSection.map((breadcrumsObj, i) => renderBreadcrums(breadcrumsObj, i))}
      </Stack>
      <Stack id="stepper" flexGrow={1} direction="row">
        {props.stepperSection && props.stepperSection.activeStep && (
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
        )}
      </Stack>
      {props.actionsSection && props.actionsSection.length > 0 && (
        <Stack id="actions" direction="row" flexGrow={1} justifyContent="flex-end">
          {props.actionsSection.map((actionObj, j) => {
            const Icon = actionObj.icon;
            return (
              <IconButton key={j} onClick={actionObj.onClickFn}>
                <SvgIcon>{Icon}</SvgIcon>
              </IconButton>
            );
          })}
        </Stack>
      )}
    </AppbarContainer>
  );
};

export default Appbar;
