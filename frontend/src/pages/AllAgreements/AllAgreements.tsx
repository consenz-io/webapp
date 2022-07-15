import "./AllAgreements.css";
import { SymbolBtn } from "../../components/styles/Button.styles";
import AddIcon from "@mui/icons-material/Add";
import img from "../../assets/Group_120.png";
import * as SC from "./AllAgreements.style";
import { useTranslation } from "react-i18next";
import { StringBank } from "../../strings";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../contexts/data";

function AllAgreements() {
  const {t} = useTranslation();
  const {groupSlug} = useParams();
  const {user} = useContext(DataContext);

  const getGroupNameBySlug = (slug: string) => user?.groups?.find(group => group.slug === slug)?.name;

  return (
    <main>
      <header>
        <SC.UserAgreements>{`${getGroupNameBySlug(groupSlug || "")}'s Agreements`}</SC.UserAgreements> {/* TODO @aviran translation could be tricky here */}
        <SymbolBtn id="btn">
          <AddIcon />
          {t(StringBank.NEW_AGREEMENT)}
        </SymbolBtn>
      </header>
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
