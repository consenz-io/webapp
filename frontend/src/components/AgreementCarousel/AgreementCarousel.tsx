import { Box } from "@mui/material";
import AgreementCard from "components/AgreementCard";
import { FC } from "react";
import { IAgreement } from "types";

const AgreementCarousel: FC<IAgreement> = ({
  id,
  category,
  updated_at,
  rationale,
  is_archived,
  name,
}) => {
  return (
    <Box
      key={id}
      flexBasis={{ xs: "25%", sm: "33%", lg: "25%", xl: "20%" }}
      padding={1}
      minWidth="0"
    >
      <AgreementCard
        id={id}
        participants={14}
        category={category?.name}
        title={name}
        updatedAt={new Date(updated_at)}
        rationale={rationale}
        is_archived={is_archived}
      />
    </Box>
  );
};

export default AgreementCarousel;
