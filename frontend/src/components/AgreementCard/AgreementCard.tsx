import { AgreementCardProps } from "../../services/types";
import "./AgreementCard.css";
import docImage from "../../assets/icons8-document-100.png";

function AgreementCard({
  tag,
  title,
  updatedAt,
  participants,
  icon,
  ...props
}: AgreementCardProps) {
  return (
    <div className="card">
      <header>
        <div className="tag">{tag}</div>
        <div className="icon">
          <img src={docImage} alt="document" width="43.5px" height="64px" />
        </div>
      </header>
      <footer>
        <div className="title">{title}</div>
        <div className="participants">{participants}</div>
        <div className="updatedAt">{updatedAt}</div>
      </footer>
    </div>
  );
}

export default AgreementCard;
