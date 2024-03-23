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
} from './pages';
import FighterDetail from './components/fighter/FighterDetail';
import OrganizationDetail, { organizationLoader } from './components/organization/OrganizationDetail';
import EventDetail, { eventLoader } from './components/event/EventDetail';
import { AuthProvider } from './hooks/useAuth';

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
        loader: (loaderArgs) => eventLoader(loaderArgs.params.id),
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
        loader: (loaderArgs) => organizationLoader(loaderArgs.params.id),
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
