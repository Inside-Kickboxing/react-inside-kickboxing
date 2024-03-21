import { NavLink } from 'react-router-dom';
import SignOut from '../auth/SignOut';

const MainNavigation = () => {
  return (
    <nav className="flex items-center h-14 px-4 border-b border-gray-200 w-full md:border-0 md:px-6 lg:gap-0 justify-center">
      <ul className="flex items-center space-x-4 lg:flex-grow lg:justify-center">
        <li>
          <NavLink to="/" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/fighters" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Fighters
          </NavLink>
        </li>
        <li>
          <NavLink to="/organizations" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Organizations
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-in" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" end className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign up
          </NavLink>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
