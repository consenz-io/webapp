import * as SC from './style';
import { FC, useState, useContext } from 'react';
import { IFCProps } from './types';
import { useResponsive } from 'hooks';
import { Logo } from 'assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { DropDownMenu, GroupsNav } from 'components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DataContext } from '../../contexts/data';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ColorModeAndDirectionContext } from '../../theme';
import { MenuItem } from 'types';
import { AuthContext } from 'contexts';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const Sidebar: FC<IFCProps> = ({ mobileOpen, handleSidebarToggle }) => {
  const { user } = useContext(DataContext);
  const { logout } = useContext(AuthContext);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const navigate = useNavigate();
  const { groupSlug } = useParams();

  const [userMenuItems] = useState<MenuItem[]>([
    {
      text: t(StringBank.LOGOUT),
      action: logout,
    },
  ]);

  const content = (
    <>
      <SC.LogoContainer>
        <Link to="/" title={t(StringBank.GOTO_HOMEPAGE_TITLE)}>
          <Logo />
        </Link>
      </SC.LogoContainer>
      <GroupsNav name="group" menuItems={user?.groups} endIcon={<KeyboardArrowDownIcon />} />
      <SC.Content>
        <List>
          <ListItemButton onClick={() => navigate(`${groupSlug}/all-agreements`)} selected>
            <ListItemIcon>
              <ContentCopyOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h4">{t(StringBank.ALL_AGREEMENTS)}</Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </SC.Content>
      <DropDownMenu
        name="user"
        menuItems={userMenuItems}
        buttonText={user?.displayName || ''}
        btnCapital={user?.displayName?.charAt(0)}
        endIcon={isRTL ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
      />
    </>
  );

  return (
    <>
      <SC.Container>
        <nav>
          {isMobile ? (
            <SC.Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleSidebarToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {content}
            </SC.Drawer>
          ) : (
            <SC.Drawer variant="persistent" anchor="left" open>
              {content}
            </SC.Drawer>
          )}
        </nav>
      </SC.Container>
    </>
  );
};

export default Sidebar;
