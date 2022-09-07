import AddIcon from "@mui/icons-material/Add";
import img from "../assets/Group_120.png";
import { useTranslation } from "react-i18next";
import { StringBank } from "../strings";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { AgreementCarousel } from "components";
import { GroupContext } from "contexts/group";
import EmptyArchivePage from "./EmptyArchivePage";

const AllArchievedAgreements = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = "") => {
    navigate(`/${slug}/new-agreement`);
  };
  const { archivedAgreements, name, slug } = useContext(GroupContext);
  console.log("archivedAgreements?.length", archivedAgreements?.length);
  if (archivedAgreements?.length > 0) {
    return (
      <Stack
        justifyContent={archivedAgreements?.length ? "start" : "space-between"}
        height="100%"
        padding={{ sm: 2 }}
        spacing={2}
      >
        <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
          <Typography variant="h2">
            {t(StringBank.GROUP_AGREEMENTS, { group: name })}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(event) => handleMenuItemClick(event, slug)}
          >
            {t(StringBank.NEW_AGREEMENT)}
          </Button>
        </Stack>
        {archivedAgreements.length ? (
          <Stack
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap={{ sx: "nowrap", sm: "wrap" }}
          >
            {archivedAgreements.map((archivedAgreement, i) => (
              <AgreementCarousel {...archivedAgreement} key={i} />
            ))}
          </Stack>
        ) : (
          <Stack alignItems="center" justifyContent="center">
            <Stack flexDirection="row" justifyContent="center">
              <img src={img} alt="" />
            </Stack>
            <Typography variant="h1" paddingY={5}>
              {t(StringBank.CREATE_FIRST_AGREEMENT)}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(event) => handleMenuItemClick(event, slug)}
            >
              {t(StringBank.NEW_AGREEMENT)}
            </Button>
          </Stack>
        )}
        <Stack />
      </Stack>
    );
  }
  return <EmptyArchivePage />;
};

export default AllArchievedAgreements;
