import * as SC from './style';
import { FC, useState, ReactNode, MouseEvent } from 'react';
import { MenuItem } from 'types';
import CircleIcon from '@mui/icons-material/Circle';
import { capitalize } from 'utils/functions';
import { IconButton } from '@mui/material';

interface IProps {
  name: string;
  buttonText?: string;
  menuItems: MenuItem[];
  endIcon?: ReactNode;
  btnCapital?: string;
  isBorderHidden?: boolean;
  mainIcon?: ReactNode;
}

const DropDownMenu: FC<IProps> = ({
  name,
  buttonText = '',
  mainIcon,
  menuItems,
  endIcon,
  btnCapital,
  isBorderHidden,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); //TODO fix anchorEl error on console
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemOnClick = (menuItem: MenuItem) => {
    menuItem.action?.();
    handleClose();
  };
  return (
    <>
      {mainIcon ? (
        <IconButton onClick={handleClick}>{mainIcon}</IconButton>
      ) : (
        <SC.DropDownMenuButton
          id={`${name}-button`}
          aria-controls={open ? `${name}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={endIcon}
          isUser={!!btnCapital}
          isBorderHidden={isBorderHidden}
        >
          {btnCapital && <SC.BtnCapital className="capital">{btnCapital}</SC.BtnCapital>}

          {btnCapital ? capitalize(buttonText) : buttonText}
        </SC.DropDownMenuButton>
      )}

      <SC.DropDownMenu
        id={`${name}-menu`}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${name}-button`,
        }}
        anchorEl={anchorEl}
      >
        {menuItems.map((menuItem, i) => {
          return (
            <SC.DropDownMenuItem key={i} onClick={() => handleMenuItemOnClick(menuItem)}>
              {menuItem.color && (
                <CircleIcon
                  style={{ fill: menuItem.color, marginRight: '.5rem', marginLeft: '-.25rem' }}
                />
              )}
              {menuItem.icon}
              {menuItem.text}
            </SC.DropDownMenuItem>
          );
        })}
      </SC.DropDownMenu>
    </>
  );
};

export default DropDownMenu;
