import useGetUserById from '@/hooks/useGetUser';
import useGetUserListsByUser from '@/hooks/useGetUserListsByUser';
import { useParams } from 'react-router-dom';

const PublicProfileDetail = () => {
  const { id } = useParams();
  const { user, isUserLoading } = useGetUserById(Number(id));
  const { userList } = useGetUserListsByUser(Number(user?.id));

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>{user.display_name}</h2>
      <p>Location: {user.location}</p>
      <p>{user.biography}</p>
      <h3>User Lists:</h3>
      <ul>
        {userList?.map((list) => (
          <li key={list.id}>
            <p>Title: {list.title}</p>
            <p>Description: {list.description}</p>
            <ul>
              {Object.entries(list).map(([key, value]) => {
                // Check if the key is a number and not one of the predefined keys
                if (!isNaN(Number(key)) && !['id', 'title', 'description'].includes(key)) {
                  return <li key={key}>{value}</li>;
                }
                return null; // Skip rendering for non-numeric keys or predefined keys
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicProfileDetail;
