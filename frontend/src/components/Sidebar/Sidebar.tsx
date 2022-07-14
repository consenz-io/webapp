import * as SC from "./style";
import {FC, useState, useEffect, useContext} from "react";
import {IFCProps, IUserData} from "./types";
import { useResponsive } from "hooks";
import { Logo } from "assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StringBank } from "strings";
import { DropDownMenu }  from "components";
import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {ColorModeAndDirectionContext} from "../../theme";
import { MenuItem } from "components/DropDownMenu/types";
import { AuthContext } from "contexts";

const Sidebar :FC<IFCProps> = ({ mobileOpen, handleSidebarToggle }) => {
  const { user } = useAuth0();
  const {logout} = useContext(AuthContext);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);

  const [groupMenuItems] = useState<MenuItem[]>([ //TODO replace static items with user groups
    {
      color: "#4fe3d1",
      text: "Soficoop"
    },
    {
      color: "#8b61e5",
      text: "Another Group"
    },
    {
      color: "#ed4fae",
      text: "Another Group"
    },
  ]);
  const [userMenuItems] = useState<MenuItem[]>([
    {
      text: t(StringBank.LOGOUT),
      action: logout,
      color: "#ed4fae"
    }
  ]);
  const [userData, setUserData] = useState<IUserData>({
    name: ""
  });
  const { name } = userData;

  useEffect(() => {
    if (user) {
      const name = user.given_name || user.nickname;
      setUserData(pv => ({...pv, name }));
    }
  }, [user]);

  const content = (
    <>
      <SC.LogoContainer>
        <Link to="/" title={t(StringBank.GOTO_HOMEPAGE_TITLE)}>
          <Logo />
        </Link>
      </SC.LogoContainer>
      <DropDownMenu
        name='group'
        menuItems={groupMenuItems}
        buttonText='Soficoop' //TODO make buttonText dynamic
        endIcon={<KeyboardArrowDownIcon />}
      />
      <SC.Content>Sidebar content</SC.Content>
      <DropDownMenu
        name='user'
        menuItems={userMenuItems}
        buttonText={name}
        btnCapital={name?.charAt(0)}
        endIcon={isRTL ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
      />
    </>
  );

  return (
    <>
      <SC.Container>
        <nav>
          {isMobile
            ?
            <SC.Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleSidebarToggle}
              ModalProps={{
                keepMounted: true
              }}
            >
              {content}
            </SC.Drawer>
            :
            <SC.Drawer
              variant="persistent"
              anchor="left"
              open
            >
              {content}
            </SC.Drawer>
          }
        </nav>
      </SC.Container>
    </>
  );
};

export default Sidebar;
