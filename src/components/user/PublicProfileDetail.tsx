import useGetUserById from '@/hooks/useGetUser';
import { useParams } from 'react-router-dom';
const PublicProfileDetail = () => {
  const { id } = useParams();

  const { user, isUserLoading } = useGetUserById(Number(id));

  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  console.log(user?.display_name);

  return (
    <div>
      <h2></h2>
      <p>Name: {user?.display_name}</p>
      <p>Location: {user?.location}</p>
      <p>{user?.biography}</p>
    </div>
  );
};

export default PublicProfileDetail;
