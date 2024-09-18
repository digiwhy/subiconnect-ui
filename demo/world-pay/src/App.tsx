import ApiProvider from './api/ApiProvider';
import { AuthenticationProvider } from './context/authentication';
import Auth0Provider from './features/auth/providers/auth0-provider/Auth0Provider';
import Routing from './routing';
import { LiftModeProvider } from '@/context/lift-mode';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Auth0Provider>
          <AuthenticationProvider>
            <LiftModeProvider>
              <Routing />
            </LiftModeProvider>
          </AuthenticationProvider>
        </Auth0Provider>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
