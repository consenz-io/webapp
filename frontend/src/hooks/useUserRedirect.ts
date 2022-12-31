import { useEffect, useContext } from 'react';
import { RoutingContext } from 'contexts';
import { UserContext } from 'contexts/user';
import { useNavigate } from 'react-router-dom';
import { PostLoginActions } from 'types/misc';
const useUserRedirect = () => {
  const navigate = useNavigate();
  const { user, joinGroup } = useContext(UserContext);
  const { navigateToWelcome, navigateToAllAgreements } = useContext(RoutingContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    const postLoginActions = JSON.parse(
      sessionStorage.getItem('postLoginActions') || '{}'
    ) as PostLoginActions;
    if (
      postLoginActions?.joinGroupId &&
      !user.groups?.some((g) => g.id === postLoginActions.joinGroupId)
    ) {
      joinGroup(postLoginActions.joinGroupId);
    }
    if (postLoginActions?.redirectTo) {
      return navigate(postLoginActions.redirectTo);
    }
    if (user.groups?.length) {
      return navigateToAllAgreements(user.groups?.[0].slug);
    }
    navigateToWelcome();
  }, [navigateToAllAgreements, navigateToWelcome, user, navigate, joinGroup]);
};

export default useUserRedirect;
