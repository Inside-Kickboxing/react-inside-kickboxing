import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RootLayout,
  ErrorPage,
  HomePage,
  EventsPage,
  SignUpPage,
  SignInPage,
  FightersPage,
  OrganizationsPage,
  UserProfilePage,
} from './pages';
import FighterDetail from './components/fighter/FighterDetail';
import OrganizationDetail from './components/organization/OrganizationDetail';
import EventDetail from './components/event/EventDetail';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './components/themeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
      },
      {
        path: '/events/:id',
        element: <EventDetail />,
      },
      {
        path: '/fighters',
        element: <FightersPage />,
      },
      {
        path: '/fighters/:id',
        element: <FighterDetail />,
      },

      {
        path: '/organizations',
        element: <OrganizationsPage />,
      },
      {
        path: '/organizations/:id',
        element: <OrganizationDetail />,
      },
      {
        path: '/profile',
        element: <UserProfilePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
      \
    </ThemeProvider>
  );
};

export default App;
