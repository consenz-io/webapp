import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { useTheme } from '@mui/material/styles';
import { ICategorySelectProps } from 'types';
import React, { useContext, useState, FC, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

import {
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateColorFromString } from 'utils/functions';
import { GroupContext } from 'contexts/group';

const CategorySelect: FC<ICategorySelectProps> = ({
  categoryId,
  onChange,
  onReady,
  onSelecting,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [isReady, setIsReady] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const { categories } = useContext(GroupContext);

  useEffect(() => {
    // When category data is available and rendered, fire onReady.
    if (!isReady && categories) {
      setIsReady(true);
      onReady();
    }
  }, [categories, onReady, isReady, setIsReady]);

  /**
   * Event handlers.
   */
  const handleChange = (event: SelectChangeEvent) => {
    const newCategoryId = event.target.value as unknown as number;
    onChange(newCategoryId);
    setIsSelecting(false);
  };

  const handleClick = () => {
    setIsSelecting(!isSelecting);
  };

  const handleOnFocus = () => {
    if (!isSelecting) setIsSelecting(true);
    onSelecting();
  };

  //@todo click away closes select

  // Utility to get category name from ID.
  const categoryName = (id: number) => {
    for (const category of categories) {
      if (category.id === id) {
        return category.name;
      }
    }
    return '';
  };

  // Styled button for selected state.
  const buttonColor = categoryId ? generateColorFromString(categoryName(categoryId), true) : '';
  const CategorySelectButton = styled(Button)({
    boxShadow: 'none',
    borderRadius: '4px',
    padding: '4px 8px 4px 16px',
    textTransform: 'none',
    backgroundColor: buttonColor,
    borderColor: buttonColor,
  });

  return categoryId && !isSelecting ? (
    <CategorySelectButton
      size="small"
      onClick={() => {
        setIsSelecting(true);
        onSelecting();
      }}
    >
      {theme.direction === 'ltr' ? (
        <>
          {categoryName(categoryId)} <ExpandMoreIcon />
        </>
      ) : (
        <>
          <ExpandMoreIcon /> {categoryName(categoryId)}
        </>
      )}
    </CategorySelectButton>
  ) : (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel sx={{ fontSize: '0.85em', fontWeight: 600, color: '#f2f2f2' }}>
        {t(StringBank.CATEGORY_SELECT)}
      </InputLabel>
      <Select
        value={String(categoryId || '')}
        label="Category"
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleOnFocus}
        open={isSelecting}
        IconComponent={ExpandMoreIcon}
        sx={{
          fontSize: '0.85em',
          fontWeight: 600,
          paddingLeft: theme.direction == 'ltr' ? '0.1em' : 'inherit',
          paddingRight: theme.direction == 'rtl' ? '0.15em' : 'inherit',
          '& .MuiSelect-icon': { color: '#f2f2f2' },
        }}
      >
        {categories.map((category, i) => {
          if (!Number.isNaN(category.id)) {
            return (
              <MenuItem key={i} value={category.id} sx={{ fontSize: '0.85em', fontWeight: 600 }}>
                {category.name}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem sx={{ fontSize: '0.85em', fontWeight: 600 }} key={i}>
                <ListItemIcon sx={{ margin: 0, padding: 0, width: 'max-content' }}>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ margin: 0, color: '#adb2b8' }}>{category.name}</ListItemText>
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
