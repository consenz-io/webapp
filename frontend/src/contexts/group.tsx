import { gql, useQuery } from '@apollo/client';
import { createContext, FC, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { IAgreement, ICategory } from 'types/misc';
import { DataContext } from './data';

interface IGroupContext {
  slug: string;
  name: string;
  id: number;
  agreements: IAgreement[];
  categories: ICategory[];
}

const GroupContext = createContext<IGroupContext>({} as IGroupContext);

const GroupProvider: FC = () => {
  const { user } = useContext(DataContext);
  const { groupSlug } = useParams();

  const currentGroup = user?.groups?.find((group) => group.slug === groupSlug);

  const { data: agreementsData } = useQuery<{ core_agreements: IAgreement[] }>(
    gql`
      query agreements($groupId: Int!) {
        core_agreements(where: { group_id: { _eq: $groupId }, is_archived: { _eq: false } }) {
          id
          name
          rationale
          category {
            id
            name
          }
        }
      }
    `,
    { variables: { groupId: currentGroup?.id || -1 } }
  );

  const { data: categoriesData } = useQuery<{ core_categories: ICategory[] }>(
    gql`
      query categories($groupId: Int!) {
        core_categories(where: { group_id: { _eq: $groupId } }) {
          id
          name
        }
      }
    `,
    { variables: { groupId: currentGroup?.id || -1 } }
  );

  const state: IGroupContext = {
    slug: currentGroup?.slug || '',
    name: currentGroup?.name || '',
    id: currentGroup?.id || -1,
    agreements: agreementsData?.core_agreements || [],
    categories: categoriesData?.core_categories || [],
  };
  return (
    <GroupContext.Provider value={state}>
      <Outlet />
    </GroupContext.Provider>
  );
};

export { GroupProvider, GroupContext };
