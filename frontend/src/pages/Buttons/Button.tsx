import {
  MainDefaultBtn,
  SymbolBtn,
  OutlinedBtn,
  OutlinedSymbolBtn,
  TextBtn,
  IconBtn,
} from "../../components/styles/Button.styles";

import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function Buttons() {
  return (
    <div
      style={{ marginLeft: "50px", backgroundColor: "#36393f", height: "80vh" }}
    >
      <h3>main</h3>
      <MainDefaultBtn>New Agreement</MainDefaultBtn>
      <h3>with symbol</h3>
      <SymbolBtn>
        <AddIcon />
        New Agreement
      </SymbolBtn>
      <h3>outline</h3>
      <OutlinedBtn variant="outlined">New Agreement</OutlinedBtn>
      <h3>outline + symbol</h3>
      <OutlinedSymbolBtn>
        <AddIcon />
        New Agreement
      </OutlinedSymbolBtn>
      <h3>text btn</h3>
      <TextBtn variant="text">New Agreement</TextBtn>
      <h3>icon btn</h3>
      <IconBtn>
        <PeopleAltIcon />
      </IconBtn>
    </div>
  );
}
