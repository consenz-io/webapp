import "./AllAgreements.css";
import { SymbolBtn } from "../../components/styles/Button.styles";
import AddIcon from "@mui/icons-material/Add";
import img from "../../assets/Group_120.png";
import * as SC from "./AllAgreements.style";

function AllAgreements() {
  return (
    <main>
      <head>
        <SC.UserAgreements>Soficoop's Agreements</SC.UserAgreements>
        <SymbolBtn id="btn">
          <AddIcon />
          New Agreement
        </SymbolBtn>
      </head>
      <section>
        <img src={img} alt="" />
        <div className="msg">
          <p>Create your</p>
          <p>first agreement</p>
        </div>
        <div className="btnRow">
          <SymbolBtn>
            <AddIcon />
            New Agreement
          </SymbolBtn>
        </div>
      </section>
    </main>
  );
}

export default AllAgreements;
