import "./AllAgreements.css";
import { SymbolBtn } from "../../components/styles/Button.styles";
import AddIcon from "@mui/icons-material/Add";
import img from "../../assets/Group_120.png";
import * as SC from "./AllAgreements.style";
import { useTranslation } from "react-i18next";
import { StringBank } from "../../strings";

function AllAgreements() {
  const {t} = useTranslation();
  return (
    <main>
      <head>
        <SC.UserAgreements>Soficoop's Agreements</SC.UserAgreements>
        <SymbolBtn id="btn">
          <AddIcon />
          {t(StringBank.NEW_AGREEMENT)}
        </SymbolBtn>
      </head>
      <section>
        <img src={img} alt="" />
        <div className="msg">
          <p>{t(StringBank.CREATE_FIRST_AGREEMENT)}</p>
        </div>
        <div className="btnRow">
          <SymbolBtn>
            <AddIcon />
            {t(StringBank.NEW_AGREEMENT)}
          </SymbolBtn>
        </div>
      </section>
    </main>
  );
}

export default AllAgreements;
