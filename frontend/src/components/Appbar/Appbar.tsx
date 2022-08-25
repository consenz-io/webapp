import { FC, useState } from 'react';
import { AppbarProps } from './types';
import { IconButton, Stack, StepLabel, SvgIcon, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { ReactComponent as XLogo } from 'assets/icons/x-circle.svg';
import styled from 'styled-components';

const AppbarContainer = styled(Stack)`
  && {
    align-items: center;
    border-bottom: solid 1px #595f68;
    margin: 0.35rem -1rem;
    padding: 0 1rem;
  }
`;

const XIconWrapper = styled(SvgIcon)`
  svg path {
    fill: #adb2b8;
  }
`;

const Appbar: FC<AppbarProps> = (props) => {
  const steps = ['Rationale', 'Sections', 'Rules'];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  console.log('setCompleted', setCompleted);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <AppbarContainer direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" gap="0.5rem" sx={{ paddingBottom: '1rem' }}>
        <DocLogo />
        <Typography>{props.agreementName}</Typography>
      </Stack>
      <Stack direction="row" sx={{ paddingBottom: '1rem' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]} sx={{ padding: '0 1rem' }}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <StepLabel
                  sx={{
                    '& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root': {
                      color: '#595f68',
                    },
                    '& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                      color: '#8d54ea',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <IconButton
        sx={{
          position: 'realtive',
          bottom: '.5rem',
        }}
      >
        <XIconWrapper onClick={props.closeFn}>
          <XLogo />
        </XIconWrapper>
      </IconButton>
    </AppbarContainer>
  );
};

export default Appbar;
