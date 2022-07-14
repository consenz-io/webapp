import { useEffect, useState } from "react";
import {useGetUser} from "../useRequest";
import {useAuth0} from "@auth0/auth0-react";
import {IGroup, IData} from "./types";

const useUser = () => {
  const [data, setData] = useState(<IData>{
    groups: [],
  });
  const { user } = useAuth0();
  const { data: userData } = useGetUser(user?.email);

  const prepareGroups = (groupsData: [IGroup] ) =>
    groupsData.map(({group}) => {
      return {
        slug: group.slug,
        name: group.name,
        color: group.color,
      };
    });

  useEffect(() => {
    if (userData) {
      setData({
        groups: prepareGroups(userData.core_users[0].user_groups),
      });
    }
  }, [userData]);

  return {
    groups: data.groups
  };
};

export default useUser;
