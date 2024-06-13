import { LoaderCircleIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading
    </div>
  );
}
