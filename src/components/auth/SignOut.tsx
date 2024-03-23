import { signOut } from '../../api/auth/supabaseAuth';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Signed out successfully');
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
