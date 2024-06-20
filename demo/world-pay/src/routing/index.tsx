import Loading from '@/components/layout/loading';
import useAuth from '@/features/auth/hooks/useAuth.hook';
import useRoute from '@/features/auth/hooks/useRoute.hook';
import IndexPage from '@/page';
import SimulatedBackend from '@/pages/backend/page';
import CustomColumnsEmployeesPage from '@/pages/employees/custom-columns-page';
import EmployeesPage from '@/pages/employees/page';
import CustomIntegrationsPage from '@/pages/integrations/custom/page';
import IntegrationsPage from '@/pages/integrations/page';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import MainLayout from '../layout';

function Routing() {
  const { getToken, isAuthenticated, isLoadingLibrary, login, user } = useAuth();
  useRoute({ getToken, isAuthenticated, isLoadingLibrary, login, hasUser: !!user, });

  return (
    <Routes>
      <Route path="*" element={<Loading />} />

      {isAuthenticated && !isLoadingLibrary && (
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<IndexPage />} />
          <Route path="integrations">
            <Route index element={<IntegrationsPage />} />
            <Route path="custom" element={<CustomIntegrationsPage />} />
          </Route>
          <Route path="employees">
            <Route index element={<EmployeesPage />} />
            <Route path="custom" element={<CustomColumnsEmployeesPage />} />
          </Route>
          <Route path="backend" element={<SimulatedBackend />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Route>
      )}
    </Routes>
  );
}

export default Routing;
