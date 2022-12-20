import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { IFCProps, User, Group } from 'types';
import { apiUrl } from 'utils/constants';
import { AuthContext } from './auth';

interface UserContextState {
  user?: User | null;
  joinGroup: (id: number) => void;
}

const UserContext = createContext<UserContextState>({} as UserContextState);
const apolloCache = new InMemoryCache({
  typePolicies: {
    core_section_versions: {
      fields: {
        created_at: {
          read(existing) {
            return new Date(existing);
          },
        },
      },
    },
    core_agreements: {
      fields: {
        updated_at: {
          read(existing) {
            return new Date(existing);
          },
        },
      },
    },
  },
});

const UserProvider = ({ children }: IFCProps) => {
  const [user, setUser] = useState<User>();
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>(
    new ApolloClient({
      uri: apiUrl,
      cache: apolloCache,
    })
  );
  const { jwt } = useContext(AuthContext);
  const { user: userAuth0 } = useAuth0();

  useEffect(() => {
    if (jwt) {
      setApolloClient(
        new ApolloClient({
          uri: apiUrl,
          cache: apolloCache,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
      );
    }
  }, [jwt]);

  useEffect(() => {
    const headers: { Authorization?: string } = {};

    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
      apolloClient
        .query({
          query: gql`
            query user($email: String!) {
              core_users(where: { email: { _eq: $email } }) {
                id
                email
                user_groups {
                  group {
                    name
                    slug
                    id
                  }
                }
              }
            }
          `,
          variables: { email: userAuth0?.email },
          context: {
            headers,
          },
        })
        .then(({ data }) => {
          const user = data.core_users[0];
          setUser({
            id: user.id,
            email: user.email,
            groups: user.user_groups.map(({ group }: { group: Group }) => group),
            displayName: userAuth0?.given_name || userAuth0?.nickname,
          });
        });
    }
  }, [apolloClient, jwt, userAuth0?.email, userAuth0?.given_name, userAuth0?.nickname]);

  const state: UserContextState = {
    user,
    joinGroup: (id: number) => {
      apolloClient.mutate({
        mutation: gql`
          mutation joinGroup($userId: Int!, $groupId: Int!) {
            insert_core_users_groups(objects: { user_id: $userId, group_id: $groupId }) {
              affected_rows
            }
          }
        `,
        variables: { userId: user?.id, groupId: id },
      });
    },
  };
  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </ApolloProvider>
  );
};

export { UserProvider, UserContext };
