import { useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import EmployeesPage from '../pages/employees/page';
import Loading from '@/components/layout/loading';
import Login from '@/components/layout/login';
import { useAuthenticationContext } from '../context/authentication';
import MainLayout from '../layout';
import IndexPage from '@/page';
import IntegrationsPage from '@/pages/integrations/page';
import CustomIntegrationsPage from '@/pages/integrations/custom/page';
import SimulatedBackend from '@/pages/backend/page';
import CustomColumnsEmployeesPage from '@/pages/employees/custom-columns-page';

function Routing() {
  const { isLoggedIn, isLoading } = useAuthenticationContext();

  const _routes = useMemo(() => {
    return createRoutesFromElements(
      <>
        {isLoggedIn && !isLoading && (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="integrations">
              <Route index element={<IntegrationsPage />} />
              <Route path="custom" element={<CustomIntegrationsPage />} />
            </Route>
            <Route path="employees">
              <Route index element={<EmployeesPage />} />
              <Route path="custom" element={<CustomColumnsEmployeesPage />} />
            </Route>
            <Route path="backend" element={<SimulatedBackend />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        )}

        {isLoading ? (
          <Route path="*" element={<Loading />} />
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </>
    );
  }, [isLoading, isLoggedIn]);

  if (isLoading) return <Loading />;

  const router = createBrowserRouter(_routes);

  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default Routing;
