import { gql, useApolloClient } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useState } from "react";
import { IDataContext, IFCProps, IUser, IGroup } from "types";
import { AuthContext } from "./auth";

const DataContext = createContext<IDataContext>({});

const DataProvider = ({ children }: IFCProps) => {
  const [user, setUser] = useState<IUser>();
  const {jwt} = useContext(AuthContext);
  const {user: userAuth0} = useAuth0();
  const {query} = useApolloClient();

  if (jwt) {
    query({
      query: gql`
        query user($email: String!) {
        core_users(where: {email: {_eq: $email}}) {
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
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    }).then(({data}) => {
      const user = data.core_users[0];
      setUser({
        id: user.id,
        email: user.email,
        groups: user.user_groups.map(({group}: {group:IGroup}) => group)
      });
    });
  }
  const state: IDataContext = {
    user
  };
  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  );
};
  
export { DataProvider, DataContext};
