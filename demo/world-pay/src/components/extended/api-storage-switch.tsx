'use client';

import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';

const APIKeySwitch = () => {
  const { apiKeyLocalStorage, setApiKeyLocalStorage } =
    useAuthenticationAuthenticatedContext();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="api-storage-mode"
        checked={apiKeyLocalStorage}
        onCheckedChange={setApiKeyLocalStorage}
      />
      <Label htmlFor="api-storage-mode">API Key Storage</Label>
    </div>
  );
};

export default APIKeySwitch;
