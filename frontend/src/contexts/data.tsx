import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IDataContext, IFCProps, User, Group } from 'types';
import { apiUrl } from 'utils/constants';
import { userQuery } from 'utils/queries';
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
  const [isRTL, setIsRTL] = useState(false);
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>(
    new ApolloClient({
      uri: apiUrl,
      cache: apolloCache,
    })
  );
  const { jwt } = useContext(AuthContext);
  const { user: userAuth0 } = useAuth0();
  const { i18n } = useTranslation();
  async function setLanguage(language: string) {
    await i18n.changeLanguage(language);
    if (language === 'en') {
      setIsRTL(false);
      return;
    }
    if (language === 'ar' || language === 'he') {
      setIsRTL(true);
      return;
    }
  }

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
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);
  useEffect(() => {
    const headers: { Authorization?: string } = {};

    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
      apolloClient
        .query({
          query: userQuery,
          variables: { email: userAuth0?.email },
          context: {
            headers,
          },
        })
        .then(({ data }) => {
          const user = data.core_users[0];
          const language = user.user_groups[0].group.language;
          setLanguage(language);
          setUser({
            id: user.id,
            email: user.email,
            groups: user.user_groups.map(({ group }: { group: Group }) => group),
            displayName: userAuth0?.given_name || userAuth0?.nickname,
          });
        });
    }
  }, [
    apolloClient,
    jwt,
    userAuth0?.email,
    userAuth0?.given_name,
    userAuth0?.nickname,
    setLanguage,
  ]);
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
