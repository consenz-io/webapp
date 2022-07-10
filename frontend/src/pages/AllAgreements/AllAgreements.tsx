import {useEffect} from "react";
import {useGetUser} from "hooks";

const AllAgreements = () => {
  const { data, isLoading, isSuccess, error  } = useGetUser("nadav@sofi.coop");

  useEffect(() => {
    console.log({data, isLoading, isSuccess, error});
  },[data, isLoading, isSuccess, error]);

  return (
    <>
      {/*{`${getGroupName(currentGroup, groups)} Agreements`}*/}
    </>
  );
};

export default AllAgreements;
