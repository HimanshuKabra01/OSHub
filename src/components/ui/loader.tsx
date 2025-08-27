// components/Loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
    </div>
  );
}
