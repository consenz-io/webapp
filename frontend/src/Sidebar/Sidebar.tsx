import "./Sidebar.css";
import {
  SidebarH3,
  SidebarHeaderSection,
  TitleSection,
  TitleText,
} from "../styles/Sidebar.styles";

function Sidebar() {
  return (
    <div id="sidebar">
      <SidebarHeaderSection>
        <SidebarH3>consenz</SidebarH3>
      </SidebarHeaderSection>
      <TitleSection>
        <TitleText>Soficoop</TitleText>
      </TitleSection>
    </div>
  );
}
export default Sidebar;
