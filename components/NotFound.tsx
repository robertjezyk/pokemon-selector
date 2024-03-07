import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface NotFoundProps {
  setError: (error: null) => void;
}

export const NotFound = ({ setError }: NotFoundProps) => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 min-h-screen p-24">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested Pokemon</p>
      <Link
        href="/pokemon"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => setError(null)}
      >
        Go Back
      </Link>
    </main>
  );
};