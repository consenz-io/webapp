import * as SC from './style';
import React, { FC, useContext, useState } from 'react';
import { IFCProps } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { generateColorFromString } from 'utils/functions';
import { GroupContext } from 'contexts/group';
import { Box, Typography } from '@mui/material';
import { backgroundBorderColor } from 'theme';

const GroupsNav: FC<IFCProps> = ({ name, menuItems, endIcon }) => {
  const navigate = useNavigate();
  const { groupSlug } = useParams();
  const { name: currentGroupName } = useContext(GroupContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); //TODO fix anchorEl error on console
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, index: number, slug: string) => {
    setAnchorEl(null);
    navigate(`/${slug}/active-agreements`);
  };

  if (!menuItems) {
    return (
      <Box
        paddingX={2}
        paddingY={1.5}
        borderTop={1}
        borderBottom={1}
        borderColor={backgroundBorderColor}
      >
        <Typography variant="h6">{currentGroupName}</Typography>
      </Box>
    );
  }

  return (
    <>
      <SC.DropDownMenuButton
        id={`${name}-button`}
        aria-label={`${name} select`}
        onClick={handleClickListItem}
        aria-haspopup="listbox"
        aria-controls={`${name}-menu`}
        aria-expanded={open ? 'true' : undefined}
        endIcon={endIcon}
      >
        {currentGroupName}
      </SC.DropDownMenuButton>

      <SC.DropDownMenu
        id={`${name}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': `${name}-button`,
          role: 'listbox',
        }}
      >
        {menuItems?.map((menuItem, index) => (
          <SC.DropDownMenuItem
            key={menuItem.slug}
            selected={menuItem.slug === groupSlug}
            onClick={(event) => handleMenuItemClick(event, index, menuItem.slug || '')}
          >
            <CircleIcon
              style={{
                fill: generateColorFromString(menuItem.slug || ''),
                marginInlineEnd: '.5rem',
                marginInlineStart: '-.25rem',
              }}
            />
            {menuItem.name}
          </SC.DropDownMenuItem>
        ))}
      </SC.DropDownMenu>
    </>
  );
};

export default GroupsNav;
