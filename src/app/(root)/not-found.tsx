import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-100">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The page you are looking for might have been moved, removed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
