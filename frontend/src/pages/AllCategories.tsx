import { useQuery } from "@apollo/client";
import { Stack, Typography, Button } from "@mui/material";
import { DataContext } from "contexts";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StringBank } from "strings";
import { IAgreement } from "types";
import { agreementsQuery } from "utils/queries";
import AddIcon from "@mui/icons-material/Add";
import img from "../assets/Group_120.png";
import { AgreementCarousel } from "components";
import { useTranslation } from "react-i18next";
import EmptyCategoryPage from "./EmptyCategoryPage";

const AllCategories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { user } = useContext(DataContext);
  console.log("user", user);
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = "") => {
    navigate(`/${slug}/new-agreement`);
  };
  const { data: activeAgreements } = useQuery<{
    core_agreements: IAgreement[];
  }>(agreementsQuery(categoryId), {
    variables: {
      groupId: 1,
      isArchived: false,
      categoryId,
    },
  });
  console.log("activeAgreements", activeAgreements);
  const agreements = activeAgreements?.core_agreements;
  if (agreements && agreements?.length > 0) {
    return (
      <Stack
        justifyContent={agreements?.length ? "start" : "space-between"}
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
            onClick={(event) => handleMenuItemClick(event, "slug")}
          >
            {t(StringBank.NEW_AGREEMENT)}
          </Button>
        </Stack>
        {agreements.length ? (
          <Stack
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap={{ sx: "nowrap", sm: "wrap" }}
          >
            {agreements.map((agreement, i) => (
              <AgreementCarousel {...agreement} key={i} />
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
              onClick={(event) => handleMenuItemClick(event, "slug")}
            >
              {t(StringBank.NEW_AGREEMENT)}
            </Button>
          </Stack>
        )}
        <Stack />
      </Stack>
    );
  }
  return <EmptyCategoryPage />;
};

export default AllCategories;
