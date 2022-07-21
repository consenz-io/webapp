import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { ICategorySelectProps } from 'types';
import { useContext, useState, FC } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from 'contexts/auth';
import { generateColorFromString } from 'utils/functions';

// Query for active group's categories
const CATEGORIES_BY_GROUP_ID = gql`
  query categories($group_id: Int!) {
    core_categories(where: { group_id: { _eq: $group_id } }, order_by: { name: asc }) {
      id
      name
    }
  }
`;

const CategorySelect: FC<ICategorySelectProps> = ({ groupId, categoryId, onChange }) => {
  const { t } = useTranslation();
  const { jwt } = useContext(AuthContext);

  const [isSelecting, setIsSelecting] = useState(false);

  // Query Hasura for the given group's category data.
  const { loading, error, data } = useQuery(CATEGORIES_BY_GROUP_ID, {
    variables: { group_id: groupId },
    context: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });

  // Wait until Hasura returns category data before displaying anything.
  if (loading) return <></>;
  if (error) {
    console.log(error);
    return <></>;
  }

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
    for (const category of data.core_categories) {
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
        value={(categoryId as unknown as string) || ''}
        label="Category"
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleOnFocus}
        open={isSelecting}
      >
        {data.core_categories?.map((category: { id: number; name: string }) => (
          <MenuItem key={category.id as unknown as string} value={category.id as unknown as string}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
