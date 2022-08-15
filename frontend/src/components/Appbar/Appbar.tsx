import { FC, useState } from 'react';
import { AppbarProps } from './types';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import CloseIcon from '@mui/icons-material/Close';

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
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: 'solid 1px #595f68', width: '85.3vw' }}
    >
      <Stack direction="row" gap="0.5rem">
        <SummarizeOutlinedIcon />
        <Typography>{props.agreementName}</Typography>
      </Stack>
      <Stack direction="row">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <IconButton onClick={props.closeFn}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default Appbar;
