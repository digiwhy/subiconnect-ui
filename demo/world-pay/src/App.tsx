import { LiftModeProvider } from '@/context/lift-mode';
import Routing from './routing';
import { AuthenticationProvider } from './context/authentication';

function App() {
  return (
    <AuthenticationProvider>
      <LiftModeProvider>
        <Routing />
      </LiftModeProvider>
    </AuthenticationProvider>
  );
}

export default App;
