import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { IDataContext, IFCProps, User, Group } from 'types';
import { apiUrl } from 'utils/constants';
import { AuthContext } from './auth';

const DataContext = createContext<IDataContext>({});
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

const DataProvider = ({ children }: IFCProps) => {
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
  const state: IDataContext = {
    user,
  };
  return (
    <ApolloProvider client={apolloClient}>
      <DataContext.Provider value={state}>{children}</DataContext.Provider>
    </ApolloProvider>
  );
};

export { DataProvider, DataContext };
