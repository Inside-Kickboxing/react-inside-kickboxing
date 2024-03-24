import { useAuth } from '@/hooks/useAuth';
import useGetUserByAuthUser from '@/hooks/useGetUserByAuthUser';
import { formatDateTime } from '@/utils/dateFormatter';
const PrivateProfileDetail = () => {
  const { authUser } = useAuth();
  const { user, isUserLoading } = useGetUserByAuthUser(authUser?.id as string);
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
          {user.role === 'admin' && <p>Role: {user.role}</p>}
          <p>Name: {user.display_name}</p>
          <p>Location: {user.location}</p>
          You've been with us since {authUser && <>{formatDateTime(authUser.created_at)}!</>}={' '}
        </div>
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default PrivateProfileDetail;
