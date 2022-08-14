import { gql, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { IGroupContext } from 'types';
import { IAgreement, ICategory } from 'types';
import { deleteAgreementMutation } from 'utils/mutations';
import { agreementsQuery } from 'utils/queries';
import { DataContext } from './data';

const GroupContext = createContext<IGroupContext>({} as IGroupContext);

const GroupProvider: FC = () => {
  const { user } = useContext(DataContext);
  const { groupSlug, categoryId } = useParams();

  const currentGroup = user?.groups?.find((group) => group.slug === groupSlug);

  const { data: activeAgreements } = useQuery<{
    core_agreements: IAgreement[];
  }>(agreementsQuery(categoryId), {
    variables: {
      groupId: currentGroup?.id || -1,
      isArchived: false,
      categoryId,
    },
  });

  const { data: archivedAgreements } = useQuery<{
    core_agreements: IAgreement[];
  }>(agreementsQuery(), {
    variables: { groupId: currentGroup?.id || -1, isArchived: true },
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
  const [deleteAgreementFn] = useMutation(deleteAgreementMutation, {
    refetchQueries: ['agreements'],
  });

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
      refetchQueries: ['agreements'],
    }
  );

  const state: IGroupContext = {
    slug: currentGroup?.slug || '',
    name: currentGroup?.name || '',
    id: currentGroup?.id || -1,
    activeAgreements: activeAgreements?.core_agreements || [],
    archivedAgreements: archivedAgreements?.core_agreements || [],
    categories: categoriesData?.core_categories || [],
    archiveAgreement: (id, iArchived) => archiveAgreement({ variables: { id, iArchived } }),
    deleteAgreement: (name) => {
      console.log('name in del agr fn in group contx', name);
      deleteAgreementFn({ variables: { name } });
    },
  };
  return (
    <GroupContext.Provider value={state}>
      <Outlet />
    </GroupContext.Provider>
  );
};

export { GroupProvider, GroupContext };
