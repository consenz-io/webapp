import AgreementCard from "../../components/AgreementCard/AgreementCard";
import ArticleIcon from "@mui/icons-material/Article";
function Agreements() {
  return (
    <>
      <link rel="icon" href={`%PUBLIC_URL%/assets/icons8-document-100.png`} />
      <h1>Agreements</h1>
      <AgreementCard
        tag="finance"
        title="Agreement title"
        updatedAt={new Date().toLocaleDateString()}
        participants="16 Participants"
        icon={<ArticleIcon sx={{ fontSize: "4rem" }} />}
      ></AgreementCard>
    </>
  );
}

export default Agreements;
