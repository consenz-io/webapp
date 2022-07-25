import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { ICategorySelectProps } from 'types';
import { useState, FC, useContext } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateColorFromString } from 'utils/functions';
import { GroupContext } from 'contexts/group';

const CategorySelect: FC<ICategorySelectProps> = ({ categoryId, onChange }) => {
  const { t } = useTranslation();

  const [isSelecting, setIsSelecting] = useState(false);

  const { categories } = useContext(GroupContext);

  /**
   * Event handlers.
   */
  const handleChange = (event: SelectChangeEvent) => {
    const newCategoryId = event.target.value as unknown as number;
    onChange(newCategoryId);
    setIsSelecting(false);
  };

  const handleClick = () => setIsSelecting(!isSelecting);

  const handleOnFocus = () => {
    if (!isSelecting) setIsSelecting(true);
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
    <CategorySelectButton size="small" onClick={() => setIsSelecting(true)}>
      {categoryName(categoryId)} <ExpandMoreIcon />
    </CategorySelectButton>
  ) : (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>{t(StringBank.CATEGORY_SELECT)}</InputLabel>
      <Select
        value={String(categoryId || '')}
        label="Category"
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleOnFocus}
        open={isSelecting}
      >
        {categories.map((category, i) => (
          <MenuItem key={i} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
