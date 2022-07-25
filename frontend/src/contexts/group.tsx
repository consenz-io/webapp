import { gql, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { IAgreement, ICategory } from 'types/misc';
import { agreementsQuery } from 'utils/queries';
import { DataContext } from './data';

interface IGroupContext {
  slug: string;
  name: string;
  id: number;
  agreements: IAgreement[];
  categories: ICategory[];
  archiveAgreement: (id: number, iArchived: boolean) => void;
}

const GroupContext = createContext<IGroupContext>({} as IGroupContext);

const GroupProvider: FC = () => {
  const { user } = useContext(DataContext);
  const { groupSlug } = useParams();

  const currentGroup = user?.groups?.find((group) => group.slug === groupSlug);

  const { data: agreementsData } = useQuery<{ core_agreements: IAgreement[] }>(agreementsQuery, {
    variables: { groupId: currentGroup?.id || -1, isArchived: false },
  });

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

  const [archiveAgreement] = useMutation(
    gql`
      mutation archiveAgreement($id: Int!, $iArchived: Boolean!) {
        update_core_agreements(where: { id: { _eq: $id } }, _set: { is_archived: $iArchived }) {
          returning {
            id
            is_archived
          }
        }
      }
    `,
    {
      update(cache, { data: { update_core_agreements } }) {
        cache.evict({
          id: cache.identify(update_core_agreements.returning[0]),
        });
      },
    }
  );

  const state: IGroupContext = {
    slug: currentGroup?.slug || '',
    name: currentGroup?.name || '',
    id: currentGroup?.id || -1,
    agreements: agreementsData?.core_agreements || [],
    categories: categoriesData?.core_categories || [],
    archiveAgreement: (id, iArchived) => archiveAgreement({ variables: { id, iArchived } }),
  };
  return (
    <GroupContext.Provider value={state}>
      <Outlet />
    </GroupContext.Provider>
  );
};

export { GroupProvider, GroupContext };
