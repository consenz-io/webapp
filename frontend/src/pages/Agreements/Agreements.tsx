import AgreementCard from "../../components/AgreementCard/AgreementCard";

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
        icon="icons8-document-100.png"
      ></AgreementCard>
    </>
  );
}

export default Agreements;
