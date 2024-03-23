import { useAuth } from '@/hooks/useAuth';
import useGetUser from '@/hooks/useGetUser';
import { formatDateTime } from '@/utils/dateFormatter';
const ProfileDetail = () => {
  const { authUser } = useAuth();
  const { user, isUserLoading } = useGetUser(authUser?.id as string);
  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  console.log(user?.display_name);

  return (
    <div>
      {user ? (
        <div>
          <h2></h2>
          <p>Email: {authUser?.email}</p>
          <>{authUser?.id}</>
          You've been with us since {authUser && <>{formatDateTime(authUser.created_at)}</>}
          <>{user.display_name}</>
          <>{user.location}</>
        </div>
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default ProfileDetail;
