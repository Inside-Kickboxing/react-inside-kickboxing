import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
