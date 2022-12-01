import * as SC from './style';
import { FC, useState, useContext } from 'react';
import { IFCProps } from './types';
import { useResponsive } from 'hooks';
import { Logo } from 'assets';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  ButtonBase,
  Container,
  List,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { GroupContext } from 'contexts/group';
import { generateColorFromString } from 'utils/functions';
import CircleIcon from '@mui/icons-material/Circle';
import { ReactComponent as FeedbackIcon } from 'assets/icons/message-square.svg';
import SvgIcon from '../SvgIcon';
import { activeBtnColor, textSecondaryColor } from 'theme/theme';
import { useAuth0 } from '@auth0/auth0-react';

interface SidebarItem {
  name: string;
  to: string;
  icon: React.ReactElement;
}

const sidebarItems: SidebarItem[] = [
  {
    name: StringBank.ALL_AGREEMENTS,
    to: 'active-agreements',
    icon: <ContentCopyOutlinedIcon />,
  },
  {
    name: StringBank.ARCHIVE,
    to: 'archive',
    icon: <Inventory2OutlinedIcon />,
  },
];

const Sidebar: FC<IFCProps> = ({ mobileOpen, handleSidebarToggle }) => {
  const { user } = useContext(DataContext);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const { jwt } = useContext(AuthContext);
  const { logout } = useAuth0();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const navigate = useNavigate();
  const { slug: groupSlug, categories } = useContext(GroupContext);
  const [userMenuItems] = useState<MenuItem[]>([
    {
      text: jwt ? t(StringBank.LOGOUT) : t(StringBank.LOGIN),
      action: logout,
    },
  ]);

  function handleFeedback(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (jwt) {
      window.location.href = 'mailto:info@consenz.io?subject=Feedback for Consenz';
    } else {
      logout();
    }
  }

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
          {sidebarItems.map((item, i) => (
            <SC.ListItemButton
              key={i}
              onClick={() => navigate(`/${groupSlug}/${item.to}`)}
              selected={window.location.href.endsWith(item.to)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{t(item.name)}</Typography>
              </ListItemText>
            </SC.ListItemButton>
          ))}
          <ListSubheader>{t(StringBank.CATEGORIES)}</ListSubheader>
          <SC.ListItemButton
            onClick={() => navigate(`/${groupSlug}/cat/0`)}
            selected={window.location.href.endsWith('0')}
          >
            <ListItemIcon>
              <CircleIcon sx={{ color: 'background.border' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">{t(StringBank.UNCATEGORIZED)}</Typography>
            </ListItemText>
          </SC.ListItemButton>
          {categories?.map((category, i) => (
            <SC.ListItemButton
              key={i}
              onClick={() => navigate(`/${groupSlug}/cat/${category.id}`)}
              selected={window.location.href.endsWith(`cat/${String(category.id)}`)}
            >
              <ListItemIcon>
                <CircleIcon
                  htmlColor={generateColorFromString(category.name, true)}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{category.name}</Typography>
              </ListItemText>
            </SC.ListItemButton>
          ))}
        </List>
      </SC.Content>
      {!jwt && <Container sx={{ backgroundColor: activeBtnColor }}>{t(StringBank.DEMO)}</Container>}
      <ButtonBase sx={{ margin: 1 }} onClick={handleFeedback} disableRipple>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" width="100%" gap={1}>
          <SvgIcon htmlColor={textSecondaryColor}>
            <FeedbackIcon />
          </SvgIcon>
          <Typography>{t(StringBank.FEEDBACK)}</Typography>
        </Stack>
      </ButtonBase>
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
