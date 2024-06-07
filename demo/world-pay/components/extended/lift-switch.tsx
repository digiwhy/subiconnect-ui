'use client';

import { useLiftMode } from 'context/lift-mode';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const LiftModeSwitch = () => {
  const { liftMode, setLiftMode } = useLiftMode();

  return (
    <div className="flex items-center gap-2">
      <Switch id="lift-mode" checked={liftMode} onCheckedChange={setLiftMode} />
      <Label htmlFor="lift-mode">Lift Mode</Label>
    </div>
  );
};

export default LiftModeSwitch;
