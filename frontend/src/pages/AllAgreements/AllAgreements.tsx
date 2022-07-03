import {useContext} from "react";
import {getGroupName} from "utils";
import {DataContext} from "store";

const AllAgreements = () => {
  const {globalUser} = useContext(DataContext);
  const {groups, currentGroup} = globalUser;

  return (
    <>
      {`${getGroupName(currentGroup, groups)} Agreements`}
    </>
  );
};

export default AllAgreements;
