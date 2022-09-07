import { FC } from "react";
import {
  IconButton,
  Stack,
  StepLabel,
  SvgIcon,
  Typography,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { ReactComponent as DocLogo } from "assets/icons/document.svg";
import { ReactComponent as XLogo } from "assets/icons/x-circle.svg";
import styled from "styled-components";

export interface AppbarProps {
  steps: string[];
  activeStep: number;
  agreementName: string;
  closeFn: () => void;
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

const Appbar: FC<AppbarProps> = (props) => {
  return (
    <AppbarContainer
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" gap="0.5rem">
        <DocLogo />
        <Typography fontSize="0.875rem" lineHeight="1.57" paddingTop="2px">
          {props.agreementName}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Stepper nonLinear activeStep={props.activeStep - 1}>
          {props.steps.map((step, i) => (
            <Step
              disabled
              key={i}
              color="inherit"
              completed={props.activeStep > i + 1}
              sx={{ padding: "0 1rem" }}
            >
              <StepButton sx={{ padding: "0", margin: "0" }} disableRipple>
                <StepLabel
                  sx={{
                    "& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root": {
                      color: "#595f68",
                    },
                    "& .css-dsfbi5-MuiSvgIcon-root-MuiStepIcon-root.Mui-active":
                      {
                        color: "#8d54ea",
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
