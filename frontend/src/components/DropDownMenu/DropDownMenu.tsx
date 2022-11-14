import * as SC from './style';
import { FC, useState, ReactNode, MouseEvent } from 'react';
import { MenuItem } from 'types';
import CircleIcon from '@mui/icons-material/Circle';
import { capitalize } from 'utils/functions';
import { IconButton, Typography } from '@mui/material';
import { VariantType } from 'types';

interface IProps {
  value?: number | null;
  name: string;
  buttonText?: string;
  menuItems: MenuItem[];
  endIcon?: ReactNode;
  btnCapital?: string;
  isBorderHidden?: boolean;
  mainIcon?: ReactNode;
  styleVariant?: VariantType;
  bgColor?: string;
}

const DropDownMenu: FC<IProps> = ({
  name,
  buttonText = '',
  mainIcon,
  menuItems,
  endIcon,
  btnCapital,
  isBorderHidden,
  value,
  styleVariant,
  bgColor,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemOnClick = (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    menuItem: MenuItem
  ) => {
    menuItem.action?.();
    handleClose(e);
  };

  const getButtonText = () => {
    if (value) {
      return menuItems.find((item) => item.value === value)?.text;
    }

    if (btnCapital) {
      return (
        <>
          <SC.BtnCapital className="capital">{btnCapital}</SC.BtnCapital>
          {capitalize(buttonText)}
        </>
      );
    }

    return buttonText;
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
          stylevariant={styleVariant}
          bgcolor={bgColor}
        >
          {getButtonText()}
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
        stylevariant={styleVariant}
      >
        {menuItems.map((menuItem, i) => {
          return (
            <SC.DropDownMenuItem
              selected={menuItem.value === value}
              key={i}
              onClick={(e) => handleMenuItemOnClick(e, menuItem)}
              stylevariant={styleVariant}
            >
              {menuItem.color && (
                <CircleIcon
                  style={{
                    fill: menuItem.color,
                    marginRight: '.5rem',
                    marginLeft: '-.25rem',
                  }}
                />
              )}
              {menuItem.icon}
              <Typography variant="body2" color={menuItem.textColor}>
                {menuItem.text}
              </Typography>
            </SC.DropDownMenuItem>
          );
        })}
      </SC.DropDownMenu>
    </>
  );
};

export default DropDownMenu;
