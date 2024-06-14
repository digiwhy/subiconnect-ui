import { Link } from 'react-router-dom';
import { Logo } from '../icons';

export default function Login() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-2">
      <Logo />
      Please login to the{' '}
      <Link to={import.meta.env.VITE_BASE_PORTAL_URL as string}>
        dev portal.
      </Link>
    </div>
  );
}
