import { gql, useMutation, useQuery } from '@apollo/client';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Group, LocalChapter } from 'types';
import { Agreement, Category } from 'types';
import { deleteAgreementMutation } from 'utils/mutations';
import { agreementsQuery, groupsQuery } from 'utils/queries';
import { addAgreementMutation } from 'utils/mutations';
import { isJsonContentEmpty } from 'utils/functions';
import { SettingsContext } from './settings';

interface GroupContext {
  slug: string;
  name: string;
  id: number;
  agreements: Agreement[];
  categories: Category[];
  currentCategory?: Category;
  archiveAgreement: (id: number, iArchived: boolean) => void;
  deleteAgreement: (id: number) => void;
  addAgreement: (
    categoryId: number | null,
    name: string,
    rationale: string,
    chapters: LocalChapter[]
  ) => Promise<Agreement>;
  addAgreementData: unknown;
  addAgreementError: unknown;
  isLoadingAgreements: boolean;
}

const GroupContext = createContext<GroupContext>({} as GroupContext);

const GroupProvider: FC = () => {
  const [isBeforeLoading, setIsBeforeLoading] = useState(true);
  const { setLanguage } = useContext(SettingsContext);
  const { groupSlug, categoryId } = useParams();
  const isArchive = location.pathname.endsWith('archive');

  const { data: groups } = useQuery<{ core_groups: Group[] }>(groupsQuery, {
    variables: { slug: groupSlug },
    skip: !groupSlug,
  });
  const currentGroup = groups?.core_groups?.[0];
  useEffect(() => {
    if (currentGroup?.language) {
      setLanguage(currentGroup.language);
    }
  }, [currentGroup, setLanguage]);

  const { data: agreements, loading: agreementsLoading } = useQuery<{
    core_agreements: Agreement[];
  }>(agreementsQuery(categoryId), {
    variables: {
      groupId: currentGroup?.id || -1,
      isArchived: isArchive,
      categoryId,
    },
    skip: !currentGroup?.id,
    onCompleted: () => {
      if (isBeforeLoading) {
        setIsBeforeLoading(false);
      }
    },
  });

  const { data: categoriesData } = useQuery<{ core_categories: Category[] }>(
    gql`
      query categories($groupId: Int!) {
        core_categories(where: { group_id: { _eq: $groupId } }) {
          id
          name
        }
      }
    `,
    { variables: { groupId: currentGroup?.id || -1 }, skip: !currentGroup?.id }
  );

  const currentCategory = categoriesData?.core_categories?.find((c) => c.id === Number(categoryId));
  const [deleteAgreementFn] = useMutation(deleteAgreementMutation, {
    refetchQueries: ['agreements'],
  });

  const [addAgreement, { data: addAgreementData, error: addAgreementError }] = useMutation(
    addAgreementMutation,
    { refetchQueries: ['agreements'] }
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
      refetchQueries: ['agreements'],
    }
  );

  const state: GroupContext = {
    slug: currentGroup?.slug || '',
    name: currentGroup?.name || '',
    id: currentGroup?.id || -1,
    agreements: agreements?.core_agreements || [],
    categories: categoriesData?.core_categories || [],
    currentCategory,
    archiveAgreement: (id, iArchived) => archiveAgreement({ variables: { id, iArchived } }),
    deleteAgreement: (id: number) => deleteAgreementFn({ variables: { id } }),
    addAgreement: async (categoryId, name, rationale, chapters) => {
      const allNonEmptySections = chapters
        .flatMap((chapter) => chapter.sections)
        .filter((section) => section.content);
      const { data } = await addAgreement({
        variables: {
          groupId: currentGroup?.id,
          name,
          rationale,
          categoryId,
          chapters: chapters
            .filter((c) => c.name)
            .map((c, i) => ({
              index: i,
              name: c.name,
              sections: {
                data: c.sections
                  .filter((s) => !isJsonContentEmpty(s.content))
                  .map((s) => ({
                    index: allNonEmptySections.indexOf(s) + 1,
                    versions: { data: { content: s.content } },
                  })),
              },
            })),
        },
      });
      return data?.insert_core_agreements_one;
    },
    addAgreementData,
    isLoadingAgreements: isBeforeLoading || agreementsLoading,
    addAgreementError,
  };
  return (
    <GroupContext.Provider value={state}>
      <Outlet />
    </GroupContext.Provider>
  );
};

export { GroupProvider, GroupContext };
