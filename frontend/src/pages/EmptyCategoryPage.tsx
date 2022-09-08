import { Stack, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { StringBank } from "../strings";
import { useTranslation } from "react-i18next";

interface State {
  catName: string;
  catColor: string;
}

const Span = styled.span`
  && {
    background-color: ${(props) => props.color};
    width: 54px;
    height: 25px;
    flex-grow: 0;
    padding: 2px 6px 3px;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 6px;
    font-weight: normal;
    letter-spacing: normal;
  }
`;

const NewAgreementButton = styled(Button)`
  && {
    width: 160px;
    height: 36px;
    border-radius: 8px;
    flex-grow: 0;
    font-family: Lato;
    font-size: 14px;
    background-color: #3f4550;
  }
`;

const EmptyCategoryPage = () => {
  const state: State = useLocation().state as State;
  const { t } = useTranslation();

  const { catName, catColor } = state;
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        padding="2.5rem 2.875rem 0 1.875rem"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography fontSize="1.625rem" fontWeight="600">
          {catName}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh", width: "100%" }}
      >
        <Stack
          direction="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="1.125rem" fontWeight="600">
            There are no <Span color={catColor}>{catName}</Span> agreements
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography fontSize="0.875rem" color="#adb2b8" padding="1rem 0">
            Maybe you&apos;d like to create one
          </Typography>
        </Stack>
        <Stack direction="row" padding="1rem 0">
          <NewAgreementButton variant="contained" startIcon={<AddIcon />}>
            {t(StringBank.NEW_AGREEMENT)}
          </NewAgreementButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmptyCategoryPage;
