import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/api/auth/supabaseAuth';
import ThemeToggle from '../ThemeToggle';

const MainNavigation = () => {
  const { session } = useAuth();
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

  return (
    <nav className="flex items-center h-14 px-4 border-b border-gray-200 w-full md:border-0 md:px-6 lg:gap-0 justify-center">
      <ul className="flex items-center space-x-4 lg:flex-grow lg:justify-center">
        <li>
          <NavLink to="/" end className="text-xl font-medium text-gray-700 hover:text-gray-900">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" end className="text-xl font-medium text-gray-700 hover:text-gray-900">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/fighters" end className="text-xl font-medium text-gray-700 hover:text-gray-900">
            Fighters
          </NavLink>
        </li>
        <li>
          <NavLink to="/organizations" end className="text-xl font-medium text-gray-700 hover:text-gray-900">
            Organizations
          </NavLink>
        </li>
        {session ? (
          <li>
            <button className="text-xl font-medium text-green-600 hover:text-green-800" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/sign-in" end className="text-xl font-medium text-gray-700 hover:text-gray-900">
              Sign in
            </NavLink>
          </li>
        )}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
