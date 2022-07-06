import { AgreementCardProps } from "../../services/types";
import {
  UpdatedAt,
  Participants,
  Title,
  Footer,
  CardEl,
  Header,
  IconContainer,
  Tag,
  Icon,
} from "./Agreemen.style";

function AgreementCard({
  tag,
  title,
  updatedAt,
  participants,
  icon,
}: AgreementCardProps) {
  return (
    <CardEl variant="outlined">
      <Header>
        <Tag>{tag}</Tag>
        <IconContainer>
          <Icon>{icon}</Icon>
        </IconContainer>
      </Header>
      <Footer>
        <Title>{title}</Title>
        <Participants>{participants}</Participants>
        <UpdatedAt>{updatedAt}</UpdatedAt>
      </Footer>
    </CardEl>
  );
}

export default AgreementCard;
